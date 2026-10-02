import Link from 'next/link';
import { adminStats, listOrders } from '@/lib/server/db';
import { ORDER_STATUS } from '@/lib/orders';
import { dt, rp } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ikhtisar' };

export default async function AdminHome() {
  let stats = { total: 0, today: 0, products: 0, methods: 0, byStatus: {} };
  let recent = [];
  let error = '';

  try {
    [stats, recent] = await Promise.all([adminStats(), listOrders({ limit: 8 })]);
  } catch (e) {
    error = e.message || 'Gagal memuat data';
  }

  const cards = [
    { label: 'Pesanan hari ini', value: stats.today },
    { label: 'Total pesanan', value: stats.total },
    { label: 'Produk aktif', value: stats.products },
    { label: 'Metode pembayaran', value: stats.methods },
  ];

  return (
    <>
      <div className="av-hd">
        <div>
          <h1>Dashboard</h1>
          <p>Pantau pesanan WhatsApp, produk, dan metode pembayaran.</p>
        </div>
        <div className="av-actions">
          <Link className="av-btn ghost" href="/admin/produk/baru">
            + Produk baru
          </Link>
          <Link className="av-btn gold" href="/admin/pesanan">
            Kelola pesanan
          </Link>
        </div>
      </div>

      {error ? <div className="av-err">{error}</div> : null}

      <div className="av-grid cols-4" style={{ marginBottom: 16 }}>
        {cards.map((c) => (
          <div className="av-stat" key={c.label}>
            <i />
            <b>{c.value}</b>
            <span>{c.label}</span>
          </div>
        ))}
      </div>

      <div className="av-card">
        <div className="av-hd" style={{ marginBottom: 12 }}>
          <div>
            <h2>Pesanan terbaru</h2>
            <p className="sub">Dari halaman checkout & pembayaran.</p>
          </div>
          <Link className="av-btn ghost sm" href="/admin/pesanan">
            Lihat semua
          </Link>
        </div>

        {recent.length ? (
          <div className="av-scroll">
            <table className="av-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Produk</th>
                  <th>Nomor tujuan</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Waktu</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.inv}>
                    <td className="num">{o.inv}</td>
                    <td>{o.title || o.slug}</td>
                    <td className="num">{o.to}</td>
                    <td className="num">{rp(o.total)}</td>
                    <td>
                      <span className={'ast ' + o.status}>{ORDER_STATUS[o.status] || o.status}</span>
                    </td>
                    <td className="muted">{dt(o.created)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="av-empty">
            <b>Belum ada pesanan</b>
            Pesanan akan muncul di sini begitu pelanggan checkout.
          </div>
        )}
      </div>
    </>
  );
}
