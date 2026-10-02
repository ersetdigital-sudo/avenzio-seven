'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ClipboardList, CreditCard, LayoutDashboard, LogOut, Package, ExternalLink } from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Ikhtisar', Icon: LayoutDashboard },
  { href: '/admin/pesanan', label: 'Pesanan', Icon: ClipboardList },
  { href: '/admin/produk', label: 'Produk', Icon: Package },
  { href: '/admin/metode-pembayaran', label: 'Metode Bayar', Icon: CreditCard },
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
            const { Icon } = item;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={on ? 'on' : ''}
                aria-current={on ? 'page' : undefined}
              >
                <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="av-side-foot">
          <Link href="/" target="_blank">
            <ExternalLink size={14} strokeWidth={1.9} aria-hidden="true" />
            Lihat situs
          </Link>
          <button type="button" onClick={logout}>
            <LogOut size={14} strokeWidth={1.9} aria-hidden="true" />
            Keluar
          </button>
        </div>
      </aside>

      <div className="av-main">{children}</div>
    </div>
  );
}
