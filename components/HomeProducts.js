'use client';

import { useState } from 'react';
import { BY_SLUG, PRODUCTS } from '@/lib/catalog';
import ProductCard from './ProductCard';

const TABS = [
  { f: 'all', label: 'Semua' },
  { f: 'tsel', label: 'Telkomsel' },
  { f: 'xl', label: 'XL' },
  { f: 'isat', label: 'Indosat' },
  { f: 'tri', label: 'Tri' },
];

const FEATURED = [
  'telkomsel-pulsa-25000',
  'xl-pulsa-25000',
  'token-pln-50000',
  'dana-saldo-100000',
];

/** "Paling sering dibeli" grid with provider filter tabs. */
export default function HomeProducts() {
  const [filter, setFilter] = useState('all');

  const list =
    filter === 'all'
      ? FEATURED.map((s) => BY_SLUG[s]).filter(Boolean)
      : PRODUCTS.filter((p) => p.prov === filter).slice(0, 4);

  return (
    <>
      <div className="atabs" role="tablist" data-hometabs="">
        {TABS.map((t) => (
          <button
            key={t.f}
            type="button"
            className={filter === t.f ? 'on' : ''}
            aria-selected={filter === t.f}
            onClick={() => setFilter(t.f)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="agrid" id="homeProducts">
        {list.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
    </>
  );
}
