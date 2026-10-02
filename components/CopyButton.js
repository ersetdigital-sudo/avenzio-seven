'use client';

import { useState } from 'react';

/** Copy-to-clipboard button (promo codes). */
export default function CopyButton({ code, className = '' }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className}
      data-copy={code}
      onClick={() => {
        try {
          if (navigator.clipboard) navigator.clipboard.writeText(code);
        } catch {}
        setDone(true);
      }}
    >
      {done ? 'Tersalin' : 'Salin'}
    </button>
  );
}
