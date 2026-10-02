'use client';

import { useCallback, useEffect, useState } from 'react';
import ImageUpload from './ImageUpload';
import { cld } from '@/lib/cloudinary';

const EMPTY = {
  name: '',
  accountName: '',
  accountNumber: '',
  notes: '',
  image: { url: '', id: '' },
  active: true,
  sort: 0,
};

function toItem(m) {
  if (!m) return { ...EMPTY };
  return {
    name: m.name || '',
    accountName: m.accountName || '',
    accountNumber: m.accountNumber || '',
    notes: m.notes || '',
    image: { url: m.image || '', id: m.imageId || '' },
    active: m.active === undefined ? true : !!m.active,
    sort: m.sort || 0,
  };
}

export default function MethodsPanel() {
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null); // null | 'new' | id
  const [f, setF] = useState({ ...EMPTY });
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/payment-methods');
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Gagal memuat metode pembayaran');
      setItems(data.items || []);
    } catch (e) {
      setErr(e.message);
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function set(k, v) {
    setF((prev) => ({ ...prev, [k]: v }));
  }

  function startCreate() {
    setF({ ...EMPTY });
    setEditing('new');
    setErr('');
    setMsg('');
  }

  function startEdit(m) {
    setF(toItem(m));
    setEditing(m.id);
    setErr('');
    setMsg('');
  }

  const isQris = /qris/i.test(f.name || '');

  async function submit(e) {
    e.preventDefault();
    setErr('');
    if (!f.name.trim()) return setErr('Nama metode wajib diisi.');
    if (isQris && f.active && !f.image.url) {
      return setErr('Unggah foto QRIS dulu sebelum mengaktifkan QRIS.');
    }
    setBusy('form');
    try {
      const payload = isQris
        ? {
            // QRIS: hanya nama, foto, status — tanpa data rekening.
            name: f.name.trim(),
            accountName: '',
            accountNumber: '',
            notes: f.notes,
            image: f.image.url,
            imageId: f.image.id,
            active: f.active,
            sort: 0,
          }
        : {
            name: f.name.trim(),
            accountName: f.accountName,
            accountNumber: f.accountNumber,
            notes: f.notes,
            image: f.image.url,
            imageId: f.image.id,
            active: f.active,
            sort: Number(f.sort) || 0,
          };
      const isNew = editing === 'new';
      const res = await fetch(
        isNew ? '/api/payment-methods' : '/api/payment-methods/' + editing,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan');
      setEditing(null);
      setMsg('Metode pembayaran tersimpan.');
      load();
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy('');
    }
  }

  async function toggle(m) {
    const qris = /qris/i.test(m.name || '');
    if (qris && !m.active && !m.image) {
      setErr('Unggah foto QRIS dulu sebelum mengaktifkan QRIS.');
      return;
    }
    setBusy(m.id);
    setErr('');
    try {
      const res = await fetch('/api/payment-methods/' + m.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...m, active: !m.active }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Gagal mengubah status');
      setItems((prev) => prev.map((x) => (x.id === m.id ? data.item : x)));
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy('');
    }
  }

  async function remove(m) {
    if (!window.confirm('Hapus metode "' + m.name + '"?')) return;
    setBusy(m.id);
    setErr('');
    try {
      const res = await fetch('/api/payment-methods/' + m.id, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Gagal menghapus');
      setItems((prev) => prev.filter((x) => x.id !== m.id));
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy('');
    }
  }

  return (
    <>
      <div className="av-hd">
        <div>
          <div className="aeye">
            <i />
            Pembayaran
          </div>
          <h1>Metode Pembayaran</h1>
          <p>Atur metode yang ditawarkan ke pelanggan, termasuk foto QRIS.</p>
        </div>
        <button className="av-btn gold" type="button" onClick={startCreate}>
          + Metode baru
        </button>
      </div>

      {err ? <div className="av-err">{err}</div> : null}
      {msg ? <div className="av-ok">{msg}</div> : null}

      {editing ? (
        <form className="av-card" onSubmit={submit}>
          <h2>
            {editing === 'new' ? (isQris ? 'QRIS baru' : 'Metode baru') : f.name || 'Ubah metode'}
          </h2>
          <p className="sub">
            {isQris
              ? 'Metode pembayaran QRIS — cukup nama, foto QR, dan status.'
              : 'Isi detail rekening untuk metode transfer / bank.'}
          </p>

          <div className="av-field">
            <label className="av-lab" htmlFor="mName">
              Nama metode
            </label>
            <input
              className="av-in"
              id="mName"
              value={f.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder={isQris ? 'QRIS' : 'Transfer Bank BCA'}
            />
          </div>

          {isQris ? (
            <>
              <div className="av-qris-card">
                <div className="av-qris-head">
                  <b>{f.name || 'QRIS'}</b>
                  <span>Metode pembayaran QRIS</span>
                </div>
                <ImageUpload
                  id="mImage"
                  label="Foto QRIS"
                  value={f.image}
                  onChange={(img) => set('image', img)}
                  hint="Upload gambar QRIS (JPG / PNG / WEBP, maks 2MB). QR tidak boleh terpotong."
                />
                <div className="av-qris-status">
                  <span className={'ast ' + (f.active ? 'berhasil' : 'kedaluwarsa')}>
                    {f.active ? 'Aktif' : 'Nonaktif'}
                  </span>
                  {f.active && !f.image.url ? (
                    <span className="av-warn">Foto QRIS belum ada — QRIS tidak tampil di checkout.</span>
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="av-row">
                <div className="av-field">
                  <label className="av-lab" htmlFor="mSort">
                    Urutan
                  </label>
                  <input
                    className="av-in"
                    id="mSort"
                    inputMode="numeric"
                    value={String(f.sort)}
                    onChange={(e) => set('sort', e.target.value.replace(/\D/g, ''))}
                    placeholder="0"
                  />
                </div>
                <div className="av-field">
                  <label className="av-lab" htmlFor="mAccName">
                    Nama pemilik rekening / merchant
                  </label>
                  <input
                    className="av-in"
                    id="mAccName"
                    value={f.accountName}
                    onChange={(e) => set('accountName', e.target.value)}
                    placeholder="Avenzio Seven"
                  />
                </div>
              </div>

              <div className="av-field">
                <label className="av-lab" htmlFor="mAccNum">
                  Nomor rekening / ID
                </label>
                <input
                  className="av-in"
                  id="mAccNum"
                  value={f.accountNumber}
                  onChange={(e) => set('accountNumber', e.target.value)}
                  placeholder="1234567890"
                />
              </div>

              <div className="av-field">
                <label className="av-lab" htmlFor="mNotes">
                  Catatan untuk pelanggan
                </label>
                <textarea
                  className="av-in"
                  id="mNotes"
                  value={f.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  placeholder="Konfirmasi bukti transfer ke WhatsApp CS."
                />
              </div>

              <ImageUpload
                id="mImage"
                label="Foto (opsional)"
                value={f.image}
                onChange={(img) => set('image', img)}
                hint="JPG / PNG / WEBP, maks 2MB."
              />
            </>
          )}

          <label className="av-check">
            <input type="checkbox" checked={f.active} onChange={(e) => set('active', e.target.checked)} />
            Aktif (tampil di situs)
          </label>

          <div className="av-actions">
            <button className="av-btn gold" disabled={busy === 'form'}>
              {busy === 'form' ? 'Menyimpan…' : 'Simpan'}
            </button>
            <button
              className="av-btn ghost"
              type="button"
              onClick={() => {
                setEditing(null);
                setErr('');
              }}
            >
              Batal
            </button>
          </div>
        </form>
      ) : null}

      <div className="av-card">
        <h2>Daftar metode</h2>
        <p className="sub">{items ? items.length + ' metode' : 'Memuat…'}</p>

        {items === null ? (
          <div className="av-empty">Memuat metode pembayaran…</div>
        ) : items.length === 0 ? (
          <div className="av-empty">
            <b>Belum ada metode pembayaran</b>
            Tambahkan metode pertama (misal QRIS).
          </div>
        ) : (
          <div className="av-list">
            {items.map((m) => (
              <div className="av-item" key={m.id}>
                <div className="av-item-main">
                  {m.image ? (
                    <img
                      className="av-thumb"
                      src={cld(m.image, { w: 128 })}
                      alt={'QRIS ' + m.name}
                      loading="lazy"
                    />
                  ) : (
                    <span className="av-thumb" aria-hidden="true" />
                  )}
                  <div>
                    <b>{m.name}</b>
                    {/qris/i.test(m.name || '') ? (
                      <span>Metode pembayaran QRIS</span>
                    ) : (
                      <>
                        <span>
                          {m.accountName}
                          {m.accountNumber ? ' · ' + m.accountNumber : ''}
                        </span>
                        <span>{m.notes}</span>
                      </>
                    )}
                    {/qris/i.test(m.name || '') && m.active && !m.image ? (
                      <span className="av-warn">Foto QRIS belum ada</span>
                    ) : null}
                  </div>
                </div>
                <div className="av-actions" style={{ marginTop: 0 }}>
                  <span className={'ast ' + (m.active ? 'berhasil' : 'kedaluwarsa')}>
                    {m.active ? 'Aktif' : 'Nonaktif'}
                  </span>
                  <button className="av-btn sm ghost" type="button" onClick={() => startEdit(m)}>
                    Edit
                  </button>
                  <button
                    className="av-btn sm ghost"
                    type="button"
                    disabled={busy === m.id}
                    onClick={() => toggle(m)}
                  >
                    {m.active ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                  <button
                    className="av-btn sm ghost danger"
                    type="button"
                    disabled={busy === m.id}
                    onClick={() => remove(m)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
