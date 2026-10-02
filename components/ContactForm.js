'use client';

import { useState } from 'react';
import { wa } from '@/lib/site';

/** "Kirim Pesan" form — composes a WhatsApp message (legacy `#konForm`). */
export default function ContactForm() {
  const [form, setForm] = useState({ n: '', w: '', e: '', m: '' });
  const [err, setErr] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    const n = form.n.trim();
    const w = form.w.trim();
    const em = form.e.trim();
    const m = form.m.trim();
    if (!n || !w || !m) {
      setErr(true);
      return;
    }
    setErr(false);
    window.open(
      wa(
        'Halo Avenzio Seven,\n\nNama: ' +
          n +
          '\nNo. WhatsApp: ' +
          w +
          (em ? '\nEmail: ' + em : '') +
          '\n\n' +
          m
      ),
      '_blank',
      'noopener'
    );
  }

  return (
    <form className="abox kon-form" id="konForm" noValidate onSubmit={submit}>
      <h2>Kirim Pesan</h2>
      <p className="ahint">Pesan akan dikirim melalui WhatsApp CS kami.</p>
      <div className="kon-2">
        <div>
          <label className="afl" htmlFor="kn">
            Nama
          </label>
          <input
            className="ainp"
            id="kn"
            required
            placeholder="Nama lengkap"
            value={form.n}
            onChange={set('n')}
          />
        </div>
        <div>
          <label className="afl" htmlFor="kw">
            Nomor WhatsApp
          </label>
          <input
            className="ainp"
            id="kw"
            inputMode="numeric"
            required
            placeholder="08xxxxxxxxxx"
            value={form.w}
            onChange={set('w')}
          />
        </div>
      </div>
      <label className="afl" htmlFor="ke">
        Email
      </label>
      <input
        className="ainp"
        id="ke"
        type="email"
        placeholder="nama@email.com"
        value={form.e}
        onChange={set('e')}
      />
      <label className="afl" htmlFor="km">
        Pesan
      </label>
      <textarea
        className="ainp ata"
        id="km"
        required
        rows={4}
        placeholder="Tulis pertanyaan kamu, sertakan nomor invoice jika ada."
        value={form.m}
        onChange={set('m')}
      />
      <p className="ahint ahint-err" id="konErr" hidden={!err}>
        Lengkapi nama, nomor WhatsApp, dan pesan.
      </p>
      <button className="abtn abtn-p abtn-lg abtn-block">Kirim Pesan</button>
    </form>
  );
}
