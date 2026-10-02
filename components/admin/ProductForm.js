'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATS, PROVS } from '@/lib/catalog';
import ImageUpload from './ImageUpload';
import RupiahInput from './RupiahInput';

const EMPTY = {
  title: '',
  slug: '',
  cat: 'pulsa',
  prov: 'tsel',
  provName: '',
  short: '',
  nominal: '',
  price: '',
  bill: false,
  desc: '',
  kind: '',
  image: { url: '', id: '' },
  featured: false,
  active: true,
  sort: '',
};

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function fromItem(p) {
  if (!p) return { ...EMPTY };
  return {
    title: p.title || '',
    slug: p.slug || '',
    cat: p.cat || 'pulsa',
    prov: p.prov || '',
    provName: p.provName || '',
    short: p.short || '',
    nominal: p.nominal || '',
    price: p.price ? String(p.price) : '',
    bill: !!p.bill,
    desc: p.desc || '',
    kind: p.kind || '',
    image: { url: p.image || '', id: p.imageId || '' },
    featured: !!p.featured,
    active: p.active === undefined ? true : !!p.active,
    sort: p.sort ? String(p.sort) : '',
  };
}

export default function ProductForm({ initial }) {
  const router = useRouter();
  const editing = !!(initial && initial.slug);
  const [f, setF] = useState(() => fromItem(initial));
  const [touchedSlug, setTouchedSlug] = useState(editing);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setF(fromItem(initial));
  }, [initial]);

  function set(k, v) {
    setF((prev) => ({ ...prev, [k]: v }));
  }

  function changeTitle(v) {
    setF((prev) => ({
      ...prev,
      title: v,
      slug: touchedSlug ? prev.slug : slugify(v),
    }));
  }

  function changeProv(v) {
    const name = PROVS[v] ? PROVS[v][0] : '';
    setF((prev) => ({ ...prev, prov: v, provName: prev.provName && !PROVS[prev.prov] ? prev.provName : name }));
  }

  async function submit(e) {
    e.preventDefault();
    setErr('');
    if (!f.title.trim()) return setErr('Nama produk wajib diisi.');
    if (!f.price) return setErr('Harga wajib diisi.');
    setBusy(true);
    try {
      const payload = {
        title: f.title.trim(),
        slug: slugify(f.slug || f.title),
        cat: f.cat,
        prov: f.prov,
        provName: f.provName || (PROVS[f.prov] ? PROVS[f.prov][0] : ''),
        short: f.short.trim() || f.title.trim(),
        nominal: f.nominal,
        price: Number(f.price),
        bill: f.bill,
        desc: f.desc,
        kind: f.kind.trim() || (CATS[f.cat] || ''),
        image: f.image.url,
        imageId: f.image.id,
        featured: f.featured,
        active: f.active,
        sort: f.sort ? Number(f.sort) : 0,
      };
      const res = await fetch(editing ? '/api/products/' + initial.slug : '/api/products', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan produk');
      router.push('/admin/produk');
      router.refresh();
    } catch (e2) {
      setErr(e2.message);
      setBusy(false);
    }
  }

  return (
    <form className="av-card" onSubmit={submit}>
      {err ? <div className="av-err">{err}</div> : null}

      <div className="av-row">
        <div className="av-field">
          <label className="av-lab" htmlFor="pTitle">
            Nama produk
          </label>
          <input
            className="av-in"
            id="pTitle"
            value={f.title}
            onChange={(e) => changeTitle(e.target.value)}
            placeholder="Pulsa Telkomsel 25.000"
          />
        </div>
        <div className="av-field">
          <label className="av-lab" htmlFor="pSlug">
            Slug
          </label>
          <input
            className="av-in"
            id="pSlug"
            value={f.slug}
            onChange={(e) => {
              setTouchedSlug(true);
              set('slug', slugify(e.target.value));
            }}
            placeholder="pulsa-telkomsel-25000"
          />
          <p className="av-hint">Dibuat otomatis dari nama produk.</p>
        </div>
      </div>

      <div className="av-row av-row-3">
        <div className="av-field">
          <label className="av-lab" htmlFor="pCat">
            Kategori
          </label>
          <select className="av-in" id="pCat" value={f.cat} onChange={(e) => set('cat', e.target.value)}>
            {Object.keys(CATS).map((k) => (
              <option key={k} value={k}>
                {CATS[k]}
              </option>
            ))}
          </select>
        </div>
        <div className="av-field">
          <label className="av-lab" htmlFor="pProv">
            Provider
          </label>
          <select className="av-in" id="pProv" value={f.prov} onChange={(e) => changeProv(e.target.value)}>
            {Object.keys(PROVS).map((k) => (
              <option key={k} value={k}>
                {PROVS[k][0]}
              </option>
            ))}
          </select>
        </div>
        <div className="av-field">
          <label className="av-lab" htmlFor="pKind">
            Jenis tampilan
          </label>
          <input
            className="av-in"
            id="pKind"
            value={f.kind}
            onChange={(e) => set('kind', e.target.value)}
            placeholder="Pulsa"
          />
        </div>
      </div>

      <div className="av-row av-row-3">
        <RupiahInput id="pPrice" label="Harga" value={f.price} onChange={(v) => set('price', v)} />
        <div className="av-field">
          <label className="av-lab" htmlFor="pNominal">
            Nominal
          </label>
          <input
            className="av-in"
            id="pNominal"
            value={f.nominal}
            onChange={(e) => set('nominal', e.target.value)}
            placeholder="25.000"
          />
        </div>
        <div className="av-field">
          <label className="av-lab" htmlFor="pSort">
            Urutan
          </label>
          <input
            className="av-in"
            id="pSort"
            inputMode="numeric"
            value={f.sort}
            onChange={(e) => set('sort', e.target.value.replace(/\D/g, ''))}
            placeholder="0"
          />
        </div>
      </div>

      <div className="av-row">
        <div className="av-field">
          <label className="av-lab" htmlFor="pShort">
            Nama singkat
          </label>
          <input
            className="av-in"
            id="pShort"
            value={f.short}
            onChange={(e) => set('short', e.target.value)}
            placeholder="Telkomsel 25.000"
          />
        </div>
        <div className="av-field">
          <label className="av-lab" htmlFor="pProvName">
            Nama provider
          </label>
          <input
            className="av-in"
            id="pProvName"
            value={f.provName}
            onChange={(e) => set('provName', e.target.value)}
            placeholder="Telkomsel"
          />
        </div>
      </div>

      <div className="av-field">
        <label className="av-lab" htmlFor="pDesc">
          Deskripsi
        </label>
        <textarea
          className="av-in"
          id="pDesc"
          value={f.desc}
          onChange={(e) => set('desc', e.target.value)}
          placeholder="Pulsa reguler Telkomsel dengan proses transaksi cepat."
        />
      </div>

      <ImageUpload
        id="pImage"
        label="Foto produk"
        value={f.image}
        onChange={(img) => set('image', img)}
        hint="Ditampilkan di katalog. JPG / PNG / WEBP, maks 2MB."
      />

      <label className="av-check">
        <input type="checkbox" checked={f.bill} onChange={(e) => set('bill', e.target.checked)} />
        Ini tagihan / biaya admin (bukan nominal)
      </label>
      <label className="av-check">
        <input type="checkbox" checked={f.featured} onChange={(e) => set('featured', e.target.checked)} />
        Tampilkan di grid “Paling sering dibeli”
      </label>
      <label className="av-check">
        <input type="checkbox" checked={f.active} onChange={(e) => set('active', e.target.checked)} />
        Produk aktif (tampil di situs)
      </label>

      <div className="av-actions">
        <button className="av-btn gold" disabled={busy}>
          {busy ? 'Menyimpan…' : editing ? 'Simpan perubahan' : 'Tambah produk'}
        </button>
        <button
          className="av-btn ghost"
          type="button"
          onClick={() => {
            router.push('/admin/produk');
            router.refresh();
          }}
        >
          Batal
        </button>
      </div>
    </form>
  );
}
