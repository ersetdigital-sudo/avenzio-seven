'use client';

import { useRef, useState } from 'react';
import { cld, validateImage } from '@/lib/cloudinary';

const CLOUD_ENDPOINT = (cloud) =>
  'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload';

async function getSign(payload) {
  const res = await fetch('/api/cloudinary/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Gagal mendapatkan signature');
  return data;
}

async function uploadToCloudinary(file) {
  const sign = await getSign({ action: 'upload' });
  const fd = new FormData();
  fd.append('file', file);
  fd.append('api_key', sign.api_key);
  fd.append('timestamp', String(sign.timestamp));
  fd.append('upload_preset', sign.upload_preset);
  fd.append('signature', sign.signature);
  const res = await fetch(CLOUD_ENDPOINT(sign.cloud_name), { method: 'POST', body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data.error && data.error.message) || 'Upload gagal');
  return { url: data.secure_url, id: data.public_id };
}

async function destroyAsset(publicId) {
  if (!publicId) return;
  try {
    const sign = await getSign({ action: 'destroy', public_id: publicId });
    const fd = new FormData();
    fd.append('public_id', publicId);
    fd.append('api_key', sign.api_key);
    fd.append('timestamp', String(sign.timestamp));
    fd.append('signature', sign.signature);
    await fetch(CLOUD_ENDPOINT(sign.cloud_name), { method: 'POST', body: fd });
  } catch {
    /* aset lama gagal dihapus tidak menghalangi form */
  }
}

/**
 * Upload gambar ke Cloudinary (signed) dengan preview sebelum & sesudah upload.
 * value: { url, id } — dipakai form admin (produk, foto QRIS, dsb).
 */
export default function ImageUpload({ value, onChange, label = 'Gambar', hint = 'JPG / PNG / WEBP, maks 2MB', id = 'img' }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [localPreview, setLocalPreview] = useState('');

  const shown = value && value.url ? cld(value.url, { w: 480 }) : localPreview;

  async function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const problem = validateImage(file);
    if (problem) {
      setErr(problem);
      return;
    }
    setErr('');
    const preview = URL.createObjectURL(file);
    setLocalPreview(preview);
    setBusy(true);
    try {
      const next = await uploadToCloudinary(file);
      const oldId = value && value.id;
      setLocalPreview('');
      onChange({ url: next.url, id: next.id });
      if (oldId && oldId !== next.id) destroyAsset(oldId);
    } catch (e) {
      setErr(e.message || 'Upload gagal');
      setLocalPreview('');
    } finally {
      setBusy(false);
      URL.revokeObjectURL(preview);
    }
  }

  function remove() {
    const oldId = value && value.id;
    setLocalPreview('');
    setErr('');
    onChange({ url: '', id: '' });
    if (oldId) destroyAsset(oldId);
  }

  return (
    <div className="av-field">
      <label className="av-lab" htmlFor={id}>
        {label}
      </label>

      <div className={'av-upload' + (shown ? ' has' : '')}>
        {shown ? (
          <img className="av-upload-img" src={shown} alt={'Pratinjau ' + label} loading="lazy" />
        ) : (
          <span className="av-upload-ph" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="4" width="18" height="16" rx="2.5" />
              <circle cx="8.5" cy="9.5" r="1.6" />
              <path d="m4 17 4.5-4.5 3.5 3.5 3-3L20 17" />
            </svg>
            <span>Pilih gambar</span>
          </span>
        )}

        <div className="av-upload-acts">
          <button
            type="button"
            className="av-btn av-btn-ghost"
            disabled={busy}
            onClick={() => inputRef.current && inputRef.current.click()}
          >
            {busy ? 'Mengupload…' : shown ? 'Ganti gambar' : 'Upload gambar'}
          </button>
          {shown && !busy ? (
            <button type="button" className="av-btn av-btn-ghost danger" onClick={remove}>
              Hapus
            </button>
          ) : null}
        </div>

        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="av-hidden"
          onChange={handleFile}
        />
      </div>

      <p className={'av-hint' + (err ? ' err' : '')}>{err || hint}</p>
      {busy ? <p className="av-hint">Mengupload ke Cloudinary…</p> : null}
    </div>
  );
}
