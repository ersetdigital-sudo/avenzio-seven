'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS as FALLBACK } from '@/lib/catalog';

const Ctx = createContext({ products: FALLBACK, bySlug: {}, ready: false });

/**
 * Sumber produk untuk komponen client: ambil dari Supabase lewat /api/products,
 * fallback ke catalog.js kalau API belum siap / gagal.
 */
export function ProductsProvider({ children }) {
  const [items, setItems] = useState(FALLBACK);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch('/api/products')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d && Array.isArray(d.items) && d.items.length) setItems(d.items);
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setReady(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  const value = useMemo(() => {
    const bySlug = {};
    items.forEach((p) => {
      bySlug[p.slug] = p;
    });
    return { products: items, bySlug, ready };
  }, [items, ready]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProducts() {
  return useContext(Ctx);
}
