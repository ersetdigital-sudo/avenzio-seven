// Pseudo-QRIS preview generator (visual only — not a scannable code).
// Ported 1:1 from the legacy site (assets/app.js + assets/ppob.js) so the
// placeholder looks identical until a real payment gateway is wired up.

function hashSeed(seed, start) {
  let h = start;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

function makeFinder(x, y, c) {
  return (
    '<rect x="' + x * c + '" y="' + y * c + '" width="' + 7 * c + '" height="' + 7 * c + '" fill="#241724"/>' +
    '<rect x="' + (x + 1) * c + '" y="' + (y + 1) * c + '" width="' + 5 * c + '" height="' + 5 * c + '" fill="#fff"/>' +
    '<rect x="' + (x + 2) * c + '" y="' + (y + 2) * c + '" width="' + 3 * c + '" height="' + 3 * c + '" fill="#241724"/>'
  );
}

/** Payment-page variant (app.js): 29 modules, 5px cells, brand badge in the middle. */
export function qrPayment(seed) {
  const n = 29;
  const c = 5;
  let h = hashSeed(String(seed), 0);
  const rnd = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return (h >>> 0) / 4294967296;
  };
  let s = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if ((x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9)) continue;
      if (rnd() > 0.52) {
        s += '<rect x="' + x * c + '" y="' + y * c + '" width="' + c + '" height="' + c + '"/>';
      }
    }
  }
  const off = n * c / 2 - 10;
  return (
    '<svg viewBox="0 0 ' + n * c + ' ' + n * c + '" shape-rendering="crispEdges" fill="#241724">' +
    s +
    makeFinder(0, 0, c) +
    makeFinder(n - 7, 0, c) +
    makeFinder(0, n - 7, c) +
    '<rect x="' + (n * c / 2 - 14) + '" y="' + (n * c / 2 - 14) + '" width="28" height="28" rx="6" fill="#3D0B37"/>' +
    '<path transform="translate(' + off + ',' + off + ') scale(.62)" d="M16 3.5c1.2 0 2.2.7 2.7 1.7l9.4 20c.8 1.6-.4 3.3-2.1 3.3h-2.6c-.9 0-1.7-.5-2.1-1.4L16 12.6l-5.3 14.5c-.4.9-1.2 1.4-2.1 1.4H6c-1.7 0-2.9-1.7-2.1-3.3l9.4-20c.5-1 1.5-1.7 2.7-1.7z" fill="#fff"/>' +
    '<path transform="translate(' + off + ',' + off + ') scale(.62)" d="M10.2 14.2h13.6c.9 0 1.5 1 1.1 1.8l-6 11.6c-.3.6-.9.9-1.5.9h-2.2c-.8 0-1.3-.8-.9-1.5l4.6-9h-8.7c-.9 0-1.6-.7-1.6-1.6v-.6c0-.9.7-1.6 1.6-1.6z" fill="#FFD000"/>' +
    '</svg>'
  );
}

/** PPOB overlay variant (ppob.js): 25 modules, 6px cells, plain. */
export function qrPpob(seed) {
  const n = 25;
  const c = 6;
  let h = hashSeed(String(seed), 7);
  const rnd = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return (h >>> 0) / 4294967296;
  };
  let s = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const finder = (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
      if (!finder && rnd() > 0.52) {
        s += '<rect x="' + x * c + '" y="' + y * c + '" width="' + c + '" height="' + c + '" fill="#241724"/>';
      }
    }
  }
  return (
    '<svg viewBox="0 0 ' + n * c + ' ' + n * c + '" role="img" aria-label="Kode QRIS pratinjau">' +
    s +
    makeFinder(0, 0, c) +
    makeFinder(n - 7, 0, c) +
    makeFinder(0, n - 7, c) +
    '</svg>'
  );
}
