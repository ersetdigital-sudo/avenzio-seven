'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BOTTOM_NAV, NAV_ICONS, isNavActive } from '@/lib/site';
import PpobLink from './PpobLink';

function Icon({ href }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: NAV_ICONS[href] || '' }}
    />
  );
}

/** Mobile bottom navigation (mirrors the legacy `.abn` bar). */
export default function BottomNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  useEffect(() => {
    document.documentElement.classList.add('has-abn');
    const sync = () => setHash(window.location.hash || '');
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return (
    <nav className="abn" aria-label="Navigasi bawah">
      {BOTTOM_NAV.map((item) => {
        const on = isNavActive(item.href, pathname, hash);
        const cls = on ? 'on' : '';
        const aria = on ? { 'aria-current': 'page' } : {};
        const inner = (
          <>
            <Icon href={item.href} />
            <span>{item.label}</span>
          </>
        );
        return item.href === '/#ppob' ? (
          <PpobLink key={item.href} href={item.href} className={cls} {...aria}>
            {inner}
          </PpobLink>
        ) : (
          <Link key={item.href} href={item.href} className={cls} {...aria}>
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
