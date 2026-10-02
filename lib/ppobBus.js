// Lets any component ask the home page to open the PPOB bottom sheet.

export const PPOB_OPEN_EVENT = 'avenzio:ppob-open';

export function openPpob(params) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(PPOB_OPEN_EVENT, { detail: params || {} }));
}

export function onOpenPpob(handler) {
  if (typeof window === 'undefined') return () => {};
  const fn = (e) => handler(e.detail || {});
  window.addEventListener(PPOB_OPEN_EVENT, fn);
  return () => window.removeEventListener(PPOB_OPEN_EVENT, fn);
}

/** Parse `#ppob`, `#cat=pln`, `#p=telkomsel-pulsa-25000&to=08...` style hashes. */
export function parsePpobHash(hash) {
  const h = String(hash || '').replace(/^#/, '');
  if (!h) return null;
  if (!/ppob|cat=|p=/.test(h)) return null;
  const out = {};
  h.split('&').forEach((pair) => {
    const i = pair.indexOf('=');
    if (i > 0) out[pair.slice(0, i)] = decodeURIComponent(pair.slice(i + 1));
  });
  return out;
}
