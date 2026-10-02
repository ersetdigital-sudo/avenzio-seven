'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV, NAV_ICONS, WA_DEFAULT, isNavActive, wa } from '@/lib/site';
import Brand from './Brand';
import PpobLink from './PpobLink';

/** Renders one of the drawer icons as inline SVG content. */
function NavIcon({ href }) {
  const html = NAV_ICONS[href];
  if (!html) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setHash(window.location.hash || '');
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dr-open', open);
    document.body.classList.toggle('dr-open', open);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const hd = document.querySelector('.ahd');
    const onScroll = () => {
      if (hd) hd.classList.toggle('scrolled', window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = (href) => isNavActive(href, pathname, hash);

  const navLink = (item, variant) => {
    const on = active(item.href);
    const cls = on ? 'on' : '';
    const aria = on ? { 'aria-current': 'page' } : {};
    const isDrawer = variant === 'drawer';

    const inner = isDrawer ? (
      <>
        <i className="adr-ic">
          <NavIcon href={item.href} />
        </i>
        {item.label}
        <span>→</span>
      </>
    ) : (
      item.label
    );

    if (item.href === '/#ppob') {
      return (
        <PpobLink
          key={item.href}
          href={item.href}
          className={cls}
          onNavigate={() => setOpen(false)}
          {...aria}
        >
          {inner}
        </PpobLink>
      );
    }
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cls}
        onClick={() => setOpen(false)}
        {...aria}
      >
        {inner}
      </Link>
    );
  };

  return (
    <>
      <header className="ahd">
        <div className="awrap ahd-in">
          <Brand />
          <nav className="ahd-nav" aria-label="Navigasi utama">
            {NAV.map((item) => navLink(item, 'header'))}
          </nav>
          <div className="ahd-act">
            <a className="ahd-wa" href={wa(WA_DEFAULT)} target="_blank" rel="noopener">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.4A9 9 0 1 1 21 12Z" />
              </svg>
              <span>WhatsApp CS</span>
            </a>
            <Link className="abtn abtn-p ahd-cta" href="/cek-pesanan">
              Cek Pesanan
            </Link>
            <button
              className="ahd-menu"
              aria-label="Buka menu"
              aria-expanded={open}
              aria-controls="adr"
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className="adr-ov" onClick={() => setOpen(false)} />

      <aside id="adr" className="adr" aria-label="Menu" aria-hidden={!open}>
        <div className="adr-top">
          <Brand />
          <button className="adr-x" onClick={() => setOpen(false)} aria-label="Tutup menu">
            ✕
          </button>
        </div>
        <nav className="adr-nav">
          {NAV.map((item) => navLink(item, 'drawer'))}
        </nav>
        <div className="adr-foot">
          <a className="abtn abtn-p abtn-block" href={wa(WA_DEFAULT)} target="_blank" rel="noopener">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.4A9 9 0 1 1 21 12Z" />
            </svg>{' '}
            WhatsApp CS
          </a>
          <p>Operasional Senin – Minggu, 09.00 – 21.00 WIB</p>
        </div>
      </aside>
    </>
  );
}
