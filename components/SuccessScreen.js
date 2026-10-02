'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BY_SLUG } from '@/lib/catalog';
import { dt, rp } from '@/lib/format';
import { getLast, getOrder } from '@/lib/orders';
import { WA_DEFAULT, wa } from '@/lib/site';

/** "Pembayaran Berhasil" page (legacy `/checkout/sukses`). */
export default function SuccessScreen() {
  const [ready, setReady] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const q = new URLSearchParams(
      window.location.search + '&' + window.location.hash.slice(1)
    );
    const inv = q.get('invoice') || getLast();
    const o = inv ? getOrder(inv) : null;
    setOrder(o && o.status === 'berhasil' ? o : null);
    setReady(true);
  }, []);

  const product = order ? BY_SLUG[order.slug] : null;

  return (
    <>
      <section className="aph aph-sm">
        <div className="awrap">
          <ol className="astep">
            <li className="done">
              <b>01</b>
              <span>Produk</span>
            </li>
            <li className="done">
              <b>02</b>
              <span>Checkout</span>
            </li>
            <li className="done">
              <b>03</b>
              <span>Pembayaran</span>
            </li>
            <li className="on">
              <b>04</b>
              <span>Selesai</span>
            </li>
          </ol>
        </div>
      </section>

      {ready && order ? (
        <section className="awrap suc" id="suc">
          <div className="abox suc-box">
            <div className="suc-ic" aria-hidden="true">
              <svg viewBox="0 0 64 64" width="72" height="72">
                <circle cx="32" cy="32" r="30" fill="#3D0B37" />
                <path
                  d="m20 33 8 8 16-17"
                  fill="none"
                  stroke="#FFD000"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1>Pembayaran Berhasil</h1>
            <p className="suc-sub">Pesanan kamu sudah kami terima.</p>
            <dl className="adl">
              <div>
                <dt>Nomor Invoice</dt>
                <dd>{order.inv}</dd>
              </div>
              <div>
                <dt>Produk</dt>
                <dd>{product ? product.title : order.slug}</dd>
              </div>
              <div>
                <dt>Nominal</dt>
                <dd>{product ? product.nominal : '-'}</dd>
              </div>
              <div>
                <dt>Nomor Tujuan</dt>
                <dd>{order.to}</dd>
              </div>
              <div>
                <dt>Metode Pembayaran</dt>
                <dd>QRIS</dd>
              </div>
              <div>
                <dt>Waktu Transaksi</dt>
                <dd>{dt(order.paidAt || order.created)}</dd>
              </div>
              <div className="tot">
                <dt>Total Pembayaran</dt>
                <dd>{rp(order.total)}</dd>
              </div>
            </dl>
            <div className="suc-acts">
              <Link
                className="abtn abtn-p abtn-lg"
                href={'/cek-pesanan?invoice=' + order.inv}
              >
                Lihat Detail Transaksi
              </Link>
              <Link className="abtn abtn-o abtn-lg" href="/">
                Kembali ke Beranda
              </Link>
            </div>
            <a
              className="alink alink-sm suc-wa"
              href={wa(WA_DEFAULT)}
              target="_blank"
              rel="noopener"
            >
              Butuh bantuan? Hubungi WhatsApp CS
            </a>
          </div>
        </section>
      ) : null}

      {ready && !order ? (
        <section className="awrap" id="sucNF">
          <div className="aempty">
            <b>Belum ada pembayaran berhasil</b>
            <p>Halaman ini muncul setelah pembayaran terkonfirmasi.</p>
            <Link className="abtn abtn-p" href="/cek-pesanan">
              Cek Pesanan
            </Link>
          </div>
        </section>
      ) : null}
    </>
  );
}
