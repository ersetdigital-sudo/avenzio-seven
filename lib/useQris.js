'use client';

import { useEffect, useState } from 'react';
import { cld } from './cloudinary';

/** Ambil foto QRIS aktif dari admin (Cloudinary) untuk ditampilkan di layar bayar. */
export function useQris() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    let alive = true;
    fetch('/api/payment-methods')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d || !Array.isArray(d.items)) return;
        const withImage = d.items.find((m) => m.image) || null;
        if (withImage) setUrl(cld(withImage.image, { w: 700 }));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return url;
}
