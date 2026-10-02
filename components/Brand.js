import Link from 'next/link';
import Mark from './Mark';

/** Brand lockup: mark + "Avenzio Seven" wordmark. */
export default function Brand({ dark = false, className = '' }) {
  const cls = 'abrand' + (dark ? ' dark' : '') + (className ? ' ' + className : '');
  return (
    <Link href="/" className={cls} aria-label="Avenzio Seven beranda">
      {/* On the dark footer variant the shield must be white, not plum. */}
      <Mark white={dark} />
      <span>
        <b>Avenzio</b> Seven
      </span>
    </Link>
  );
}
