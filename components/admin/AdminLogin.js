'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr('');
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
      <form className="av-login-card" onSubmit={submit}>
        <div className="aeye">
          <i />
          Panel Admin
        </div>
        <h1>Masuk ke dashboard</h1>
        <p>Kelola pesanan, produk, dan metode pembayaran Avenzio Seven.</p>

        <div className="av-field">
          <label className="av-lab" htmlFor="adminPw">
            Password
          </label>
          <input
            className="av-in"
            id="adminPw"
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="••••••••"
          />
          {err ? <p className="av-hint err">{err}</p> : null}
        </div>

        <button className="av-btn gold" disabled={busy || !pw}>
          {busy ? 'Memeriksa…' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}
