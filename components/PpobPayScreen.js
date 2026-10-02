'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FIELDS, PHONE_CATS } from '@/lib/catalog';
import { fmtClock, rp } from '@/lib/format';
import { getOrder, newPpobInvoice, saveOrder, setLast } from '@/lib/orders';
import { pushOrder, pushStatus } from '@/lib/orderSync';
import { isQris, qrisUrl, usePaymentMethods } from '@/lib/usePaymentMethods';
import { PpLogo } from './Logo';
import { useProducts } from './ProductsProvider';

/**
 * Full-screen payment overlay used by the PPOB widget (legacy `#payScr`).
 * Metode pembayaran diambil dari database (Supabase) — QRIS tampil bila foto
 * QRIS sudah diupload admin.
 */
export default function PpobPayScreen({ inv, exp, slug, to, onClose }) {
  const router = useRouter();
  const { bySlug } = useProducts();
  const product = bySlug[slug];
  const { loading: pmLoading, selectable } = usePaymentMethods();

  const [curInv, setCurInv] = useState(inv);
  const [curExp, setCurExp] = useState(exp);
  const [status, setStatus] = useState('menunggu');
  const [checking, setChecking] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [methodId, setMethodId] = useState('');

  // Pilih metode: QRIS lebih dulu, jika tidak tersedia pakai metode pertama.
  useEffect(() => {
    if (!selectable.length) return;
    const still = selectable.find((m) => m.id === methodId);
    if (still) return;
    const first = selectable.find((m) => isQris(m)) || selectable[0];
    setMethodId(first.id);
    const stored = getOrder(curInv);
    if (stored) saveOrder({ ...stored, method: first.name });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectable, curInv]);

  const selected = selectable.find((m) => m.id === methodId) || null;

  function pickMethod(m) {
    setMethodId(m.id);
    const stored = getOrder(curInv);
    if (stored) saveOrder({ ...stored, method: m.name });
  }


  useEffect(() => {
    document.documentElement.classList.add('ps-lock');
    try {
      history.replaceState(null, '', '#invoice=' + curInv);
    } catch {}
    return () => document.documentElement.classList.remove('ps-lock');
  }, [curInv]);

  useEffect(() => {
    if (status !== 'menunggu') return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [status]);

  useEffect(() => {
    if (status !== 'menunggu' || !product) return;
    if (now >= curExp) {
      persist('kedaluwarsa');
      setStatus('kedaluwarsa');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, curExp, status]);

  if (!product) return null;

  function persist(st) {
    const existing = getOrder(curInv);
    if (existing) {
      existing.status = st;
      saveOrder(existing);
      pushStatus(curInv, st);
      return;
    }
    const fresh = {
      inv: curInv,
      slug,
      to,
      total: product.price,
      created: Date.now(),
      expires: curExp,
      status: st,
    };
    saveOrder(fresh);
    pushOrder({ ...fresh, title: product.title, method: (selected && selected.name) || 'QRIS' });
  }

  function close() {
    try {
      history.replaceState(null, '', window.location.pathname);
    } catch {}
    if (onClose) onClose();
  }

  function retry() {
    const nextInv = newPpobInvoice();
    const nextExp = Date.now() + 15 * 60000;
    saveOrder({
      inv: nextInv,
      slug,
      to,
      total: product.price,
      created: Date.now(),
      expires: nextExp,
      status: 'menunggu',
    });
    pushOrder({
      inv: nextInv,
      slug,
      title: product.title,
      to,
      total: product.price,
      status: 'menunggu',
      method: (selected && selected.name) || 'QRIS',
      expires: nextExp,
    });
    setLast(nextInv);
    setCurInv(nextInv);
    setCurExp(nextExp);
    setChecking(false);
    setStatus('menunggu');
    setNow(Date.now());
  }

  const left = Math.max(0, curExp - now);
  const countdown =
    'Bayar sebelum ' +
    fmtClock(new Date(curExp)) +
    ' · sisa ' +
    Math.floor(left / 60000) +
    ':' +
    ('0' + Math.floor((left % 60000) / 1000)).slice(-2);

  const destLabel =
    PHONE_CATS[product.cat] || product.cat === 'e-wallet'
      ? 'Nomor Tujuan'
      : FIELDS[product.cat][0];

  const summary = (
    <dl className="ps-dl">
      <div>
        <dt>Produk</dt>
        <dd>{product.title}</dd>
      </div>
      <div>
        <dt>{destLabel}</dt>
        <dd>{to}</dd>
      </div>
      <div>
        <dt>Invoice</dt>
        <dd>{curInv}</dd>
      </div>
      <div>
        <dt>Metode Pembayaran</dt>
        <dd>{selected ? selected.name : '—'}</dd>
      </div>
      <div className="tot">
        <dt>Total</dt>
        <dd>{rp(product.price)}</dd>
      </div>
    </dl>
  );

  let body;
  if (status === 'menunggu') {
    body = (
      <>
        <div className="ps-pm">
          <div className="ps-pm-t">Pembayaran</div>
          {!pmLoading && selectable.length === 0 ? (
            <p className="ps-pm-empty">
              Metode pembayaran belum dikonfigurasi. Unggah foto QRIS di admin untuk
              mengaktifkan pembayaran.
            </p>
          ) : (
            selectable.map((m) => (
              <label className="ps-pm-o" key={m.id}>
                <input
                  type="radio"
                  name="payMethod"
                  checked={!!selected && selected.id === m.id}
                  onChange={() => pickMethod(m)}
                />
                <span>{m.name}</span>
                {isQris(m) ? <i className="ps-pm-tag">QRIS</i> : null}
              </label>
            ))
          )}
        </div>

        {selected && isQris(selected) ? (
          <div className="ps-qr">
            <div className="ps-qrlab">{selected.name}</div>
            <img
              className="ps-qrimg"
              src={qrisUrl(selected)}
              alt="Foto QRIS untuk pembayaran"
              width="320"
              height="320"
            />
            <p>Scan QRIS untuk melakukan pembayaran</p>
            {selected.notes ? <p className="ps-pm-note">{selected.notes}</p> : null}
          </div>
        ) : selected ? (
          <div className="ps-qr ps-bank">
            <div className="ps-qrlab">{selected.name}</div>
            {selected.accountNumber ? (
              <p className="ps-acc">
                <b>{selected.accountName}</b>
                <span>{selected.accountNumber}</span>
              </p>
            ) : null}
            <p>{selected.notes || 'Konfirmasi bukti transfer ke WhatsApp CS.'}</p>
          </div>
        ) : null}

        <div className="ps-amt">
          <small>Total pembayaran</small>
          <b>{rp(product.price)}</b>
          <span>{product.title}</span>
        </div>
        <div className="ps-st wait">
          <span className="ps-dot" aria-hidden="true" />
          <div>
            <b>{checking ? 'Memeriksa Pembayaran' : 'Menunggu Pembayaran'}</b>
            <p>
              {checking
                ? 'Status akan berubah otomatis setelah pembayaran terkonfirmasi.'
                : 'Selesaikan pembayaran sesuai nominal yang tertera.'}
            </p>
            <p className="ps-cd">{countdown}</p>
          </div>
        </div>
        <button
          type="button"
          className="ps-btn"
          disabled={checking}
          onClick={() => setChecking(true)}
        >
          {checking ? 'Sedang dicek…' : 'Saya Sudah Bayar'}
        </button>
        {summary}
      </>
    );
  } else if (status === 'berhasil') {
    body = (
      <>
        <div className="ps-res ok">
          <span className="ps-ic">✓</span>
          <h2>Pembayaran Berhasil</h2>
          <p>Pesanan kamu sedang diproses ke tujuan.</p>
        </div>
        {summary}
        <a className="ps-btn" href={'/cek-pesanan?invoice=' + curInv + '#invoice=' + curInv}>
          Lihat Detail Transaksi
        </a>
        <button
          type="button"
          className="ps-btn2"
          onClick={() => {
            close();
            router.push('/');
          }}
        >
          Kembali ke Beranda
        </button>
      </>
    );
  } else if (status === 'gagal') {
    body = (
      <>
        <div className="ps-res bad">
          <span className="ps-ic">!</span>
          <h2>Pembayaran Tidak Berhasil</h2>
          <p>Dana tidak terpotong. Silakan coba bayar lagi.</p>
        </div>
        {summary}
        <button type="button" className="ps-btn" onClick={retry}>
          Coba Lagi
        </button>
      </>
    );
  } else {
    body = (
      <>
        <div className="ps-res exp">
          <span className="ps-ic">⏱</span>
          <h2>Transaksi Kedaluwarsa</h2>
          <p>Batas waktu pembayaran 15 menit sudah habis.</p>
        </div>
        {summary}
        <button type="button" className="ps-btn" onClick={close}>
          Buat Pesanan Baru
        </button>
      </>
    );
  }

  return (
    <div className="ps" role="dialog" aria-modal="true" aria-label="Pembayaran">
      <header className="ps-top">
        <span className="ps-brand">
          <PpLogo prov={product.prov} />
        </span>
        <h1>Pembayaran</h1>
        <span className="ps-inv">{curInv}</span>
      </header>
      <div className="ps-main">{body}</div>
    </div>
  );
}
