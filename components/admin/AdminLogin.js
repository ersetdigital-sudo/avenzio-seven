'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    if (!pw) {
      setErr('Password wajib diisi');
      setBusy(false);
      return;
    }
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Login gagal');
      router.refresh();
    } catch (e) {
      setErr(e.message);
      setBusy(false);
    }
  }

  return (
    <div className="av-login">
      <div className="av-auth">
        <section className="av-hero">
          <div className="av-hero-veil" aria-hidden="true" />
          <div className="av-hero-mark" aria-hidden="true">
            <b>Avenzio</b>
            <b>Seven</b>
            <span>digital product store</span>
          </div>

          <div className="av-hero-top">
            <span className="av-hero-brand">
              <i aria-hidden="true" />
              Avenzio Seven
            </span>
            <Link className="av-hero-link" href="/" target="_blank">
              Lihat situs
            </Link>
          </div>

          <div className="av-hero-foot">
            <div className="av-hero-user">
              <i aria-hidden="true" />
              <div>
                <b>Panel Admin</b>
                <span>Kelola pesanan, produk &amp; pembayaran</span>
              </div>
            </div>
            <span className="av-hero-meta">AVN · 07</span>
          </div>
        </section>

        <form className="av-form" onSubmit={submit}>
          <span className="av-kicker">Masuk · Dashboard</span>
          <h1>Masuk ke dashboard</h1>
          <p>Kelola pesanan WhatsApp, produk, dan metode pembayaran.</p>

          <div className="av-field">
            <label className="av-lab" htmlFor="adminPw">
              Password
            </label>
            <input
              className="av-in"
              id="adminPw"
              type="password"
              autoFocus
              autoComplete="current-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {err ? <p className="av-login-err">{err}</p> : null}

          <button className="av-btn gold" disabled={busy}>
            {busy ? 'Memeriksa…' : 'Masuk'}
          </button>

          <div className="av-login-foot">
            <span>Akses terbatas</span>
            <span>Sesi 8 jam</span>
          </div>
        </form>
      </div>
    </div>
  );
}
