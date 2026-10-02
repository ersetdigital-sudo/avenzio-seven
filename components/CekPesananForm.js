'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BY_SLUG } from '@/lib/catalog';
import { dt, rp } from '@/lib/format';
import { ORDER_STATUS, getOrder } from '@/lib/orders';
import { wa } from '@/lib/site';

/** Invoice lookup (legacy `/cek-pesanan`). */
export default function CekPesananForm() {
  const [inv, setInv] = useState('');
  const [result, setResult] = useState(null);

  function look(value) {
    const v = String(value || '').trim().toUpperCase();
    if (!v) {
      setResult({ kind: 'empty' });
      return;
    }
    const order = getOrder(v);
    setResult(order ? { kind: 'found', v, order } : { kind: 'nf', v });
  }

  useEffect(() => {
    const q = new URLSearchParams(
      window.location.search + '&' + window.location.hash.slice(1)
    );
    const v = q.get('invoice');
    if (v) {
      setInv(v);
      look(v);
    }
  }, []);

  function submit(e) {
    e.preventDefault();
    look(inv);
    try {
      history.replaceState(
        null,
        '',
        '?invoice=' + encodeURIComponent(inv.trim().toUpperCase())
      );
    } catch {}
  }

  let out = null;
  if (result && result.kind === 'empty') {
    out = (
      <div className="aempty">
        <b>Masukkan nomor invoice</b>
        <p>Contoh: INV-20261002-0001</p>
      </div>
    );
  } else if (result && result.kind === 'nf') {
    out = (
      <div className="aempty">
        <b>Invoice tidak ditemukan</b>
        <p>
          Periksa kembali nomor invoice <strong>{result.v}</strong>, atau hubungi CS kami.
        </p>
        <a
          className="abtn abtn-p"
          href={wa('Halo, saya ingin menanyakan invoice ' + result.v)}
          target="_blank"
          rel="noopener"
        >
          Hubungi WhatsApp CS
        </a>
      </div>
    );
  } else if (result && result.kind === 'found') {
    const o = result.order;
    const p = BY_SLUG[o.slug];
    out = (
      <div className="abox">
        <div className="tx-head">
          <div>
            <small>Invoice</small>
            <b>{o.inv}</b>
          </div>
          <span className={'ast ' + o.status}>{ORDER_STATUS[o.status]}</span>
        </div>
        <dl className="adl">
          <div>
            <dt>Produk</dt>
            <dd>{p ? p.title : o.slug}</dd>
          </div>
          <div>
            <dt>Nominal</dt>
            <dd>{p ? p.nominal : '-'}</dd>
          </div>
          <div>
            <dt>Nomor tujuan</dt>
            <dd>{o.to}</dd>
          </div>
          <div>
            <dt>Metode pembayaran</dt>
            <dd>QRIS</dd>
          </div>
          <div>
            <dt>Waktu</dt>
            <dd>{dt(o.created)}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{ORDER_STATUS[o.status]}</dd>
          </div>
          <div className="tot">
            <dt>Total</dt>
            <dd>{rp(o.total)}</dd>
          </div>
        </dl>
        <div className="tx-acts">
          {o.status === 'menunggu' ? (
            <Link className="abtn abtn-g" href={'/pembayaran?invoice=' + o.inv}>
              Lanjutkan Pembayaran
            </Link>
          ) : null}
          <a
            className="abtn abtn-o"
            href={wa('Halo, saya ingin menanyakan invoice ' + o.inv)}
            target="_blank"
            rel="noopener"
          >
            Hubungi WhatsApp CS
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="aph aph-c">
        <div className="awrap">
          <h1>Cek Pesanan</h1>
          <p>Masukkan nomor invoice untuk melihat status transaksi.</p>
          <form className="cek-form" id="cekForm" noValidate onSubmit={submit}>
            <label className="afl" htmlFor="inv">
              Nomor Invoice
            </label>
            <div className="cek-row">
              <input
                className="ainp"
                id="inv"
                name="invoice"
                placeholder="Contoh: INV-20261002-0001"
                autoComplete="off"
                autoCapitalize="characters"
                value={inv}
                onChange={(e) => setInv(e.target.value)}
              />
              <button className="abtn abtn-p abtn-lg">Cek Pesanan</button>
            </div>
            <p className="ahint" id="cekHint">
              Nomor invoice ada di halaman pembayaran dan bukti transaksi.
            </p>
          </form>
        </div>
      </section>
      <section className="awrap cek-res">
        <div id="cekOut">{out}</div>
      </section>
    </>
  );
}
