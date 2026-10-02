'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { rp } from '@/lib/format';

export default function ProductList() {
  const [items, setItems] = useState(null);
  const [q, setQ] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Gagal memuat produk');
      setItems(data.items || []);
    } catch (e) {
      setErr(e.message);
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggle(p) {
    setBusy(p.slug);
    setErr('');
    try {
      const res = await fetch('/api/products/' + p.slug, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...p, active: !p.active, price: Number(p.price) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Gagal mengubah status');
      setItems((prev) => prev.map((x) => (x.slug === p.slug ? data.item : x)));
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy('');
    }
  }

  async function remove(p) {
    if (!window.confirm('Hapus produk "' + p.title + '"? Tindakan ini tidak bisa dibatalkan.')) {
      return;
    }
    setBusy(p.slug);
    setErr('');
    try {
      const res = await fetch('/api/products/' + p.slug, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Gagal menghapus');
      setItems((prev) => prev.filter((x) => x.slug !== p.slug));
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy('');
    }
  }

  const list = (items || []).filter((p) => {
    const s = (q || '').toLowerCase();
    if (!s) return true;
    return (
      p.title.toLowerCase().includes(s) ||
      p.slug.includes(s) ||
      (p.provName || '').toLowerCase().includes(s)
    );
  });

  return (
    <>
      <div className="av-hd">
        <div>
          <div className="aeye">
            <i />
            Katalog
          </div>
          <h1>Produk</h1>
          <p>Tambah, ubah harga, dan atur visibilitas produk.</p>
        </div>
        <Link className="av-btn gold" href="/admin/produk/baru">
          + Produk baru
        </Link>
      </div>

      {err ? <div className="av-err">{err}</div> : null}

      <div className="av-card">
        <div className="av-tools">
          <input
            className="av-in"
            placeholder="Cari nama produk / provider…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {items ? <span className="av-hint">{list.length} produk</span> : null}
        </div>

        {items === null ? (
          <div className="av-empty">Memuat produk…</div>
        ) : list.length === 0 ? (
          <div className="av-empty">
            <b>Produk tidak ditemukan</b>
            Ubah kata kunci pencarian atau tambah produk baru.
          </div>
        ) : (
          <div className="av-scroll">
            <table className="av-table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.slug}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{p.title}</div>
                      <div className="muted">/{p.slug}</div>
                    </td>
                    <td className="muted">
                      {p.provName || p.prov}
                      {p.featured ? ' · unggulan' : ''}
                    </td>
                    <td className="num">{rp(p.price)}</td>
                    <td>
                      <span className={'ast ' + (p.active ? 'berhasil' : 'kedaluwarsa')}>
                        {p.active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td>
                      <div className="av-actions" style={{ marginTop: 0 }}>
                        <Link className="av-btn sm ghost" href={'/admin/produk/' + p.slug}>
                          Edit
                        </Link>
                        <button
                          className="av-btn sm ghost"
                          type="button"
                          disabled={busy === p.slug}
                          onClick={() => toggle(p)}
                        >
                          {p.active ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                        <button
                          className="av-btn sm ghost danger"
                          type="button"
                          disabled={busy === p.slug}
                          onClick={() => remove(p)}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
