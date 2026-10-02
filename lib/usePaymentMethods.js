'use client';

import { useEffect, useState } from 'react';
import { cld } from './cloudinary';

export const isQris = (m) => /qris/i.test((m && m.name) || '');

/** URL foto QRIS (Cloudinary) dari metode aktif di database. */
export function qrisUrl(m) {
  return m && m.image ? cld(m.image, { w: 700 }) : '';
}

/**
 * Ambil metode pembayaran aktif dari Supabase (via /api/payment-methods).
 * - QRIS yang belum punya foto sengaja dikeluarkan dari daftar siap pakai.
 * - fetch no-store supaya foto terbaru langsung terpakai setelah admin ganti.
 */
export function usePaymentMethods() {
  const [state, setState] = useState({ loading: true, items: [], selectable: [], qris: null });

  useEffect(() => {
    let alive = true;
    fetch('/api/payment-methods', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive) return;
        const items = d && Array.isArray(d.items) ? d.items : [];
        const selectable = items.filter((m) => !isQris(m) || m.image);
        const qris = items.find((m) => isQris(m) && m.image) || null;
        setState({ loading: false, items, selectable, qris });
      })
      .catch(() => {
        if (alive) setState({ loading: false, items: [], selectable: [], qris: null });
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
