// Formatting helpers (identical output to the legacy site).

export function rp(n) {
  return 'Rp' + Number(n).toLocaleString('id-ID');
}

export function digits(s) {
  return String(s == null ? '' : s).replace(/\D/g, '');
}

export function fmtClock(d) {
  return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
}

/** Long Indonesian date-time, e.g. "2 Oktober 2026, 14:05 WIB". */
export function dt(t) {
  const d = new Date(t);
  return (
    d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) +
    ', ' +
    d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
    ' WIB'
  );
}
