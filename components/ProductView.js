'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CATS, FIELDS, PROVS } from '@/lib/catalog';
import { rp } from '@/lib/format';
import { setPending } from '@/lib/orders';
import PpobForm from './PpobForm';

const TRUST = [
  { d: 'M13 2 4 14h7l-1 8 9-12h-7Z', label: 'Diproses otomatis' },
  {
    d: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2z',
    label: 'Bayar via QRIS',
  },
  { d: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z', label: 'Status bisa dicek kapan saja' },
];

const STEPS = [
  'Masukkan nomor tujuan',
  'Periksa detail produk',
  'Bayar melalui QRIS',
  'Tunggu transaksi selesai',
];

/** Detail produk digital (PPOB): hero identitas + form beli + ringkasan. */
export default function ProductView({ product }) {
  const [val, setVal] = useState('');
  const [touched, setTouched] = useState(false);
  const [started, setStarted] = useState(false);
  const [payTo, setPayTo] = useState('');

  const rx = new RegExp(product.rx);
  const ok = rx.test(val);
  const showErr = touched && !ok;
  const v = PROVS[product.prov] || [product.prov, product.prov, '#3D0B37', '#fff'];

  useEffect(() => {
    document.body.classList.toggle('has-mcta', !started);
    return () => document.body.classList.remove('has-mcta');
  }, [started]);

  function buy(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!ok) {
      setTouched(true);
      return;
    }
    setPending({ p: product.slug, to: val });
    setPayTo(val);
    setStarted(true);
    window.requestAnimationFrame(() => {
      const el = document.getElementById('pdSection');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  return (
    <>
      <div className="awrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/#ppob">Beli</Link>
          <span>/</span>
          <Link href={'/#cat=' + product.cat}>{CATS[product.cat]}</Link>
          <span>/</span>
          <b>{product.short}</b>
        </nav>
      </div>

      {/* ── Hero identitas: pengganti kotak "foto produk" ── */}
      <section className="awrap pd-hero-wrap">
        <div className="pd-hero">
          <div className="pd-hero-row">
            <div className="pd-id">
              <span className="pd-logobadge">
                <span className="pd-logo" style={{ background: v[2], color: v[3] }}>
                  {v[1]}
                </span>
              </span>
              <div className="pd-idtx">
                <div className="pd-idmeta">
                  <span className="apill">{product.kind}</span>
                  <span className="pd-provname">{product.provName}</span>
                </div>
                <h1>{product.title}</h1>
                <p className="pd-desc">{product.desc}</p>
              </div>
            </div>
            <div className="pd-price">
              <small>{product.bill ? 'Biaya admin' : 'Harga'}</small>
              <b>{rp(product.price)}</b>
              <span>
                {product.bill
                  ? 'Tagihan dicek setelah nomor divalidasi'
                  : 'Harga per transaksi · proses otomatis'}
              </span>
            </div>
          </div>

          <ul className="pd-chips">
            {TRUST.map((t) => (
              <li key={t.label}>
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d={t.d} />
                </svg>
                {t.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Konten: form beli (kiri) + ringkasan (kanan) ── */}
      <section className="awrap pd" id="pdSection">
        <div className="pd-buy">
          {started ? (
            <div id="ppob" className="pp pp-inline" aria-label="Formulir transaksi">
              <PpobForm init={{ p: product.slug, to: payTo, pay: true }} />
            </div>
          ) : (
            <form className="pd-form" id="buyForm" noValidate onSubmit={buy}>
              <div className="pd-formhead">
                <h2>Beli sekarang</h2>
                <p>Isi nomor tujuan, lalu lanjut pembayaran dengan QRIS.</p>
              </div>

              <label className="afl" htmlFor="to">
                Nomor Tujuan
              </label>
              <div className={'ainp-w' + (ok ? ' ok' : '') + (showErr ? ' err' : '')}>
                <input
                  className="ainp"
                  id="to"
                  name="to"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder={product.placeholder}
                  aria-describedby="toHint"
                  value={val}
                  onChange={(e) => setVal(e.target.value.replace(/\D/g, ''))}
                  onBlur={() => {
                    if (val) setTouched(true);
                  }}
                />
                <span className="ainp-ok" aria-hidden="true">
                  ✓
                </span>
              </div>
              <p className="ahint" id="toHint">
                {showErr
                  ? (val ? 'Format nomor belum sesuai. ' : 'Nomor tujuan wajib diisi. ') +
                    product.hint
                  : product.hint}
              </p>

              <div className="afl">Metode Pembayaran</div>
              <div className="paym on">
                <span className="paym-ic">QRIS</span>
                <div>
                  <b>QRIS</b>
                  <small>Mobile banking &amp; e-wallet</small>
                </div>
                <span className="paym-r" aria-hidden="true" />
              </div>

              <button className="abtn abtn-g abtn-lg abtn-block pd-cta" type="submit">
                Bayar Sekarang
              </button>
            </form>
          )}
        </div>

        <div className="pd-side">
          <div className="abox">
            <h2>Detail Produk</h2>
            <dl className="adl">
              <div>
                <dt>Provider</dt>
                <dd>{product.provName}</dd>
              </div>
              <div>
                <dt>Kategori</dt>
                <dd>{CATS[product.cat]}</dd>
              </div>
              <div>
                <dt>Nominal</dt>
                <dd>{product.nominal}</dd>
              </div>
              <div>
                <dt>Estimasi proses</dt>
                <dd>{FIELDS[product.cat][4]}</dd>
              </div>
              <div>
                <dt>Metode pembayaran</dt>
                <dd>QRIS</dd>
              </div>
            </dl>
          </div>

          <div className="abox">
            <h2>Cara Pembelian</h2>
            <ol className="anum">
              {STEPS.map((s, i) => (
                <li key={s}>
                  <b>{i + 1}</b>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="mcta" style={started ? { display: 'none' } : undefined}>
        <div>
          <small>Harga</small>
          <b>{rp(product.price)}</b>
        </div>
        <button className="abtn abtn-g" type="button" onClick={buy}>
          Bayar Sekarang
        </button>
      </div>
    </>
  );
}
