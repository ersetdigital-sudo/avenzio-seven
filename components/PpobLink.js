'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { openPpob } from '@/lib/ppobBus';

/**
 * Link that opens the PPOB bottom sheet when on the home page, and otherwise
 * navigates to `/#...` so the home page picks the request up from the hash.
 */
export default function PpobLink({
  href,
  params,
  className,
  children,
  onNavigate,
  ...rest
}) {
  const pathname = usePathname();

  function handleClick(e) {
    if (onNavigate) onNavigate();
    if (pathname !== '/') return; // let Next navigate; home reads the hash
    e.preventDefault();
    openPpob(params || {});
    try {
      history.replaceState(null, '', href);
    } catch {}
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
