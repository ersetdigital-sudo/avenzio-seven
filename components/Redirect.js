'use client';

import { useEffect } from 'react';

/**
 * Client redirect used by the legacy alias routes (`/checkout`, `/katalog`,
 * `/zz-co`, `/zz-pay`). With `keepHash` it forwards `p`/`to`/`cat` params to
 * the home PPOB sheet, otherwise it just sends the visitor to `to`.
 */
export default function Redirect({ to = '/', keepHash = false }) {
  useEffect(() => {
    let url = to;
    if (keepHash) {
      const q = new URLSearchParams(
        window.location.search + '&' + window.location.hash.slice(1)
      );
      const h = [];
      ['p', 'to', 'cat'].forEach((k) => {
        const v = q.get(k);
        if (v) h.push(k + '=' + encodeURIComponent(v));
      });
      url = '/' + (h.length ? '#' + h.join('&') : '#ppob');
    }
    window.location.replace(url);
  }, [to, keepHash]);

  return <a href={to}>Lanjut ke halaman transaksi</a>;
}
