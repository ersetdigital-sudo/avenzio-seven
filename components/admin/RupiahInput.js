'use client';

import { useState } from 'react';

/** Input harga dengan format Rupiah otomatis (15000 -> Rp15.000). */
export default function RupiahInput({ id, value, onChange, label = 'Harga', hint }) {
  const [focused, setFocused] = useState(false);

  const digits = String(value || '').replace(/\D/g, '');
  const num = digits ? Number(digits) : 0;
  const shown = digits
    ? focused
      ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      : 'Rp' + num.toLocaleString('id-ID')
    : '';

  return (
    <div className="av-field">
      <label className="av-lab" htmlFor={id}>
        {label}
      </label>
      <div className="av-rupiah">
        <span className="cur">Rp</span>
        <input
          className="av-in"
          id={id}
          inputMode="numeric"
          autoComplete="off"
          placeholder="0"
          value={shown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, '').slice(0, 12);
            onChange(d ? String(Number(d)) : '');
          }}
        />
      </div>
      {hint || num > 0 ? <p className="av-hint">{hint || 'Tersimpan: Rp' + num.toLocaleString('id-ID')}</p> : null}
    </div>
  );
}
