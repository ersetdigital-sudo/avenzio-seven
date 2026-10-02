'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fmtClock, rp } from '@/lib/format';
import { getLast, getOrder, saveOrder } from '@/lib/orders';
import { pushStatus } from '@/lib/orderSync';
import { useQris } from '@/lib/useQris';
import { useProducts } from './ProductsProvider';

const LABEL = {
  menunggu: 'Menunggu Pembayaran',
  berhasil: 'Pembayaran Berhasil',
  gagal: 'Pembayaran Gagal',
  kedaluwarsa: 'Transaksi Kedaluwarsa',
};

/** QRIS payment page (legacy `/pembayaran`) — preview + manual status simulation. */
export default function PaymentScreen() {
  const router = useRouter();
  const { bySlug } = useProducts();
  const qris = useQris();
  const [invoice, setInvoice] = useState('');
  const [order, setOrder] = useState(null);
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const q = new URLSearchParams(
      window.location.search + '&' + window.location.hash.slice(1)
    );
    const inv = (q.get('invoice') || getLast() || '').toUpperCase();
    setInvoice(inv);
    setOrder(inv ? getOrder(inv) : null);
    setReady(true);
  }, []);

  const live = !!order && order.status === 'menunggu';

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [live]);

  // Re-read the stored order so the 15-minute timeout auto-expires it.
  useEffect(() => {
    if (!invoice) return;
    const fresh = getOrder(invoice);
    if (fresh && (!order || fresh.status !== order.status)) {
      setOrder(fresh);
      if (order && fresh.status !== order.status) pushStatus(invoice, fresh.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, invoice]);

  useEffect(() => {
    document.body.classList.toggle('has-mcta', live);
    return () => document.body.classList.remove('has-mcta');
  }, [live]);

  function persist(mutate) {
    const o = getOrder(invoice);
    if (!o) return;
    mutate(o);
    saveOrder(o);
    setOrder({ ...o });
  }

  function paid() {
    persist((o) => {
      o.claimed = true;
    });
  }

  function cancel() {
    if (!window.confirm('Batalkan transaksi ini?')) return;
    persist((o) => {
      o.status = 'gagal';
      o.cancelled = true;
    });
    pushStatus(invoice, 'gagal');
  }

  function simulate(status) {
    persist((o) => {
      o.status = status;
      if (status === 'berhasil') o.paidAt = Date.now();
    });
    pushStatus(invoice, status);
    if (status === 'berhasil') {
      router.push('/checkout/sukses?invoice=' + invoice + '#invoice=' + invoice);
    }
  }

  const product = order ? bySlug[order.slug] : null;
  const left = order ? Math.max(0, order.expires - now) : 0;
  const timerText = order
    ? 'Bayar sebelum ' +
      fmtClock(new Date(order.expires)) +
      ' · sisa ' +
      Math.floor(left / 60000) +
      ':' +
      ('0' + Math.floor((left % 60000) / 1000)).slice(-2)
    : '';
  const showMsg = !!order && (!live || order.claimed);

  let msg = null;
  if (order && live && order.claimed) {
    msg = (
      <>
        <b>Kami sedang memeriksa pembayaranmu</b>Status akan berubah otomatis setelah
        pembayaran terkonfirmasi. Simpan nomor invoice <strong>{order.inv}</strong>.
      </>
    );
  } else if (order && !live) {
    if (order.status === 'berhasil') {
      msg = (
        <>
          <b>Pembayaran berhasil</b>Pesanan kamu sudah kami terima.
          <br />
          <Link className="abtn abtn-p" href={'/checkout/sukses?invoice=' + order.inv}>
            Lihat ringkasan
          </Link>
        </>
      );
    } else if (order.status === 'gagal') {
      msg = (
        <>
          <b>{order.cancelled ? 'Transaksi dibatalkan' : 'Pembayaran gagal'}</b>Tidak ada
          dana yang ditagihkan untuk transaksi ini. Silakan buat pesanan baru.
          <br />
          <Link className="abtn abtn-p" href={'/produk/' + order.slug}>
            Pesan ulang
          </Link>
        </>
      );
    } else {
      msg = (
        <>
          <b>Waktu pembayaran habis</b>Kode QRIS sudah tidak berlaku. Silakan buat pesanan
          baru.
          <br />
          <Link className="abtn abtn-p" href={'/produk/' + order.slug}>
            Pesan ulang
          </Link>
        </>
      );
    }
  }

  const step3 = !ready || live ? 'on' : 'done';
  const step4 = ready && order && !live ? 'on' : '';

  return (
    <>
      <section className="aph aph-sm">
        <div className="awrap">
          <h1>Pembayaran</h1>
          <ol className="astep">
            <li className="done">
              <b>01</b>
              <span>Produk</span>
            </li>
            <li className="done">
              <b>02</b>
              <span>Checkout</span>
            </li>
            <li className={step3}>
              <b>03</b>
              <span>Pembayaran</span>
            </li>
            <li className={step4}>
              <b>04</b>
              <span>Selesai</span>
            </li>
          </ol>
        </div>
      </section>

      {ready && order ? (
        <section className="awrap pay" id="pay">
          <div className="abox pay-main">
            <div className="pay-head">
              <div>
                <small>Invoice</small>
                <b>{order.inv}</b>
              </div>
              <span className={'ast ' + order.status}>{LABEL[order.status]}</span>
            </div>
            <div className="pay-amt">
              <small>Total pembayaran</small>
              <b>{rp(order.total)}</b>
            </div>
            <div className={'pay-qr' + (live ? '' : ' dim')}>
              <div className="pay-qrbox">
                <div className="pay-qrlab">QRIS</div>
                {qris ? (
                  <img className="pay-qrimg" src={qris} alt="Foto QRIS" width="320" height="320" />
                ) : (
                  <p className="pay-qrmiss">
                    Foto QRIS belum dikonfigurasi admin. Hubungi CS untuk opsi pembayaran
                    lainnya.
                  </p>
                )}
              </div>
              <p>
                Scan QRIS menggunakan aplikasi
                <br />
                mobile banking atau e-wallet.
              </p>
              <p className="pay-timer">{live ? timerText : ''}</p>
            </div>
            {showMsg ? <div className="pay-msg">{msg}</div> : null}
            {live ? (
              <div className="pay-acts">
                <button className="abtn abtn-g abtn-lg" type="button" onClick={paid}>
                  Sudah Bayar
                </button>
                <button className="abtn abtn-o abtn-lg" type="button" onClick={cancel}>
                  Batalkan Transaksi
                </button>
              </div>
            ) : null}
          </div>

          <aside className="abox pay-side">
            <h2>Ringkasan</h2>
            <dl className="adl">
              <div>
                <dt>Produk</dt>
                <dd>{product ? product.title : order.slug}</dd>
              </div>
              <div>
                <dt>Nomor tujuan</dt>
                <dd>{order.to}</dd>
              </div>
              <div>
                <dt>Metode</dt>
                <dd>{order.method || 'QRIS'}</dd>
              </div>
            </dl>
            <div className="pay-note">
              <b>Belum terhubung ke payment gateway</b>
              <p>
                Kode QR di halaman ini adalah pratinjau tampilan. Status hanya berubah
                setelah gateway QRIS dihubungkan.
              </p>
              <div className="pay-demo">
                <small>Simulasi status (mode uji):</small>
                <button type="button" onClick={() => simulate('berhasil')}>
                  Berhasil
                </button>
                <button type="button" onClick={() => simulate('gagal')}>
                  Gagal
                </button>
                <button type="button" onClick={() => simulate('kedaluwarsa')}>
                  Kedaluwarsa
                </button>
              </div>
            </div>
          </aside>
        </section>
      ) : null}

      {ready && !order ? (
        <section className="awrap" id="payNF">
          <div className="aempty">
            <b>Invoice tidak ditemukan</b>
            <p>Periksa kembali nomor invoice kamu.</p>
            <Link className="abtn abtn-p" href="/cek-pesanan">
              Cek Pesanan
            </Link>
          </div>
        </section>
      ) : null}

      {live ? (
        <div className="mcta" id="payM">
          <div>
            <small>Total</small>
            <b>{rp(order.total)}</b>
          </div>
          <button className="abtn abtn-g" type="button" onClick={paid}>
            Sudah Bayar
          </button>
        </div>
      ) : null}
    </>
  );
}
