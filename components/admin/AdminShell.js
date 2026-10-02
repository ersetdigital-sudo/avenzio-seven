'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
  { href: '/admin', label: 'Ikhtisar', n: '01' },
  { href: '/admin/pesanan', label: 'Pesanan', n: '02' },
  { href: '/admin/produk', label: 'Produk', n: '03' },
  { href: '/admin/metode-pembayaran', label: 'Metode Bayar', n: '04' },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="av-shell">
      <aside className="av-side">
        <div className="av-brand">
          <i />
          <div>
            Avenzio Seven
            <small>Panel Admin</small>
          </div>
        </div>

        <nav className="av-nav" aria-label="Navigasi admin">
          {NAV.map((item) => {
            const on =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={on ? 'on' : ''}>
                <span>{item.n}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="av-side-foot">
          <Link href="/" target="_blank">
            Lihat situs →
          </Link>
          <button type="button" onClick={logout}>
            Keluar
          </button>
        </div>
      </aside>

      <div className="av-main">{children}</div>
    </div>
  );
}
