'use client';

import { useCallback, useEffect, useState } from 'react';
import { ORDER_STATUS } from '@/lib/orders';
import { dt, rp } from '@/lib/format';

const STATUS_KEYS = Object.keys(ORDER_STATUS);

function waLink(num, text) {
  let n = String(num || '').replace(/\D/g, '');
  if (!n) return '';
  if (n.startsWith('0')) n = '62' + n.slice(1);
  else if (n.startsWith('8')) n = '62' + n;
  return 'https://wa.me/' + n + (text ? '?text=' + encodeURIComponent(text) : '');
}

export default function OrdersPanel() {
  const [items, setItems] = useState(null);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState('');
  const [err, setErr] = useState('');
  const [open, setOpen] = useState(null);
  const [draft, setDraft] = useState({ wa: '', customer: '', note: '' });

  const load = useCallback(async (query = '', st = '') => {
    setErr('');
    try {
      const res = await fetch(
        '/api/orders?limit=300' +
          (query ? '&q=' + encodeURIComponent(query) : '') +
          (st ? '&status=' + st : '')
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Gagal memuat pesanan');
      setItems(data.items || []);
    } catch (e) {
      setErr(e.message);
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const t = setTimeout(() => load(q, status), 350);
    return () => clearTimeout(t);
  }, [q, status, load]);

  async function patch(inv, body, tag = inv) {
    setBusy(tag);
    setErr('');
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inv, ...body }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan');
      setItems((prev) => (prev || []).map((o) => (o.inv === inv ? { ...o, ...data.item } : o)));
      return data.item;
    } catch (e) {
      setErr(e.message);
      return null;
    } finally {
      setBusy('');
    }
  }

  function openDetail(o) {
    setOpen(o.inv);
    setDraft({ wa: o.wa || '', customer: o.customer || '', note: o.note || '' });
  }

  async function saveDetail() {
    const item = await patch(open, draft, 'detail');
    if (item) setOpen(null);
  }

  function refresh() {
    setItems(null);
    load(q, status);
  }

  const current = items ? items.find((o) => o.inv === open) : null;

  return (
    <>
      <div className="av-hd">
        <div>
          <div className="aeye">
            <i />
            Transaksi
          </div>
          <h1>Pesanan WhatsApp</h1>
          <p>Daftar pesanan masuk, update status, dan balas pelanggan lewat WhatsApp.</p>
        </div>
        <button className="av-btn ghost" type="button" onClick={refresh} disabled={items === null}>
          {items === null ? 'Memuat…' : 'Muat ulang'}
        </button>
      </div>

      {err ? <div className="av-err">{err}</div> : null}

      <div className="av-card">
        <div className="av-tools">
          <input
            className="av-in"
            placeholder="Cari invoice, nomor, produk, atau WA…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="av-in" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Semua status</option>
            {STATUS_KEYS.map((k) => (
              <option key={k} value={k}>
                {ORDER_STATUS[k]}
              </option>
            ))}
          </select>
        </div>

        {items === null ? (
          <div className="av-empty">Memuat pesanan…</div>
        ) : items.length === 0 ? (
          <div className="av-empty">
            <b>Pesanan tidak ditemukan</b>
            Coba ubah kata kunci atau filter status.
          </div>
        ) : (
          <div className="av-scroll">
            <table className="av-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Produk</th>
                  <th>Nomor tujuan</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>WhatsApp</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((o) => (
                  <tr key={o.inv}>
                    <td>
                      <div className="num">{o.inv}</div>
                      <div className="muted">{dt(o.created)}</div>
                    </td>
                    <td>{o.title || o.slug}</td>
                    <td className="num">{o.to}</td>
                    <td className="num">{rp(o.total)}</td>
                    <td>
                      <select
                        className="av-in"
                        value={o.status}
                        disabled={busy === o.inv}
                        onChange={(e) => patch(o.inv, { status: e.target.value }, o.inv)}
                      >
                        {STATUS_KEYS.map((k) => (
                          <option key={k} value={k}>
                            {ORDER_STATUS[k]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="num">{o.wa || '—'}</td>
                    <td>
                      <div className="av-actions" style={{ marginTop: 0 }}>
                        {o.wa ? (
                          <a
                            className="av-btn sm gold"
                            target="_blank"
                            rel="noopener"
                            href={waLink(
                              o.wa,
                              'Halo ' +
                                (o.customer || 'kak') +
                                ', pesanan ' +
                                o.inv +
                                ' (' +
                                (o.title || o.slug) +
                                ') statusnya: ' +
                                (ORDER_STATUS[o.status] || o.status) +
                                '.'
                            )}
                          >
                            Chat
                          </a>
                        ) : null}
                        <button className="av-btn sm ghost" type="button" onClick={() => openDetail(o)}>
                          Detail
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

      {current ? (
        <div className="av-card">
          <div className="av-hd" style={{ marginBottom: 14 }}>
            <div>
              <h2>{current.inv}</h2>
              <p className="sub">{current.title || current.slug}</p>
            </div>
            <button className="av-btn ghost sm" type="button" onClick={() => setOpen(null)}>
              Tutup
            </button>
          </div>

          <dl className="av-dl" style={{ marginBottom: 18 }}>
            <div>
              <dt>Nomor tujuan</dt>
              <dd>{current.to || '—'}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{rp(current.total)}</dd>
            </div>
            <div>
              <dt>Metode</dt>
              <dd>{current.method || 'QRIS'}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <span className={'ast ' + current.status}>
                  {ORDER_STATUS[current.status] || current.status}
                </span>
              </dd>
            </div>
            <div>
              <dt>Dibuat</dt>
              <dd>{dt(current.created)}</dd>
            </div>
            <div>
              <dt>Dibayar</dt>
              <dd>{current.paidAt ? dt(current.paidAt) : '—'}</dd>
            </div>
          </dl>

          <div className="av-row">
            <div className="av-field">
              <label className="av-lab">WhatsApp pelanggan</label>
              <input
                className="av-in"
                inputMode="numeric"
                placeholder="0812xxxxxxx"
                value={draft.wa}
                onChange={(e) => setDraft({ ...draft, wa: e.target.value })}
              />
              <p className="av-hint">Format bebas, otomatis dinormalkan jadi 628xxxx.</p>
            </div>
            <div className="av-field">
              <label className="av-lab">Nama pelanggan</label>
              <input
                className="av-in"
                placeholder="Opsional"
                value={draft.customer}
                onChange={(e) => setDraft({ ...draft, customer: e.target.value })}
              />
            </div>
          </div>

          <div className="av-field">
            <label className="av-lab">Catatan internal</label>
            <textarea
              className="av-in"
              placeholder="Catatan untuk tim…"
              value={draft.note}
              onChange={(e) => setDraft({ ...draft, note: e.target.value })}
            />
          </div>

          <div className="av-actions">
            <button
              className="av-btn"
              type="button"
              disabled={busy === 'detail'}
              onClick={saveDetail}
            >
              {busy === 'detail' ? 'Menyimpan…' : 'Simpan perubahan'}
            </button>
            {draft.wa ? (
              <a
                className="av-btn gold"
                target="_blank"
                rel="noopener"
                href={waLink(draft.wa, 'Halo, pesanan ' + current.inv + '…')}
              >
                Chat WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
