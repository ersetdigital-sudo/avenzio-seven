// Site-wide constants & helpers.

/** WhatsApp CS number — TODO: isi nomor, format 628xxxxxxxxxx */
export const WA_NUMBER = '';

export const WA_DEFAULT = 'Halo Avenzio Seven, saya butuh bantuan.';

/** Build a wa.me link, optionally with a prefilled message. */
export function wa(text) {
  return 'https://wa.me/' + WA_NUMBER + (text ? '?text=' + encodeURIComponent(text) : '');
}

/** Main navigation (mirrors the legacy header). */
export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/#ppob', label: 'Beli' },
  { href: '/promo', label: 'Promo' },
  { href: '/cek-pesanan', label: 'Cek Pesanan' },
  { href: '/hubungi-kami', label: 'Hubungi Kami' },
];

/** Icon path data used by the mobile drawer navigation. */
export const NAV_ICONS = {
  '/': '<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  '/#ppob':
    '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18h3"/>',
  '/promo':
    '<path d="M3 12V4h8l10 10-7 7z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
  '/cek-pesanan':
    '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  '/hubungi-kami':
    '<path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.4A9 9 0 1 1 21 12Z"/>',
};

/** Bottom navigation items (mobile only). */
export const BOTTOM_NAV = [
  { href: '/', label: 'Home' },
  { href: '/#ppob', label: 'Beli' },
  { href: '/promo', label: 'Promo' },
  { href: '/cek-pesanan', label: 'Cek Pesanan' },
];

/** Match a nav href against the current location to compute the active state. */
export function isNavActive(href, pathname, hash) {
  const hashOpen = /ppob|cat=|p=/.test(hash || '');
  if (href === '/') return pathname === '/' && !hashOpen;
  if (href === '/#ppob') {
    return pathname.startsWith('/produk') || (pathname === '/' && hashOpen);
  }
  const base = href.split('#')[0];
  return pathname === base || pathname.startsWith(base + '/');
}
