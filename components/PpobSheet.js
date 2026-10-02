'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { onOpenPpob, parsePpobHash } from '@/lib/ppobBus';
import Mark from './Mark';
import PpobForm from './PpobForm';

/**
 * The "Beli" bottom sheet shown on the home page (legacy `#ppx`).
 * Opens when the URL hash is `#ppob`, `#cat=...` or `#p=...`, or when any
 * `PpobLink` requests it via the ppob bus.
 */
export default function PpobSheet() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [params, setParams] = useState({});
  const [seed, setSeed] = useState(0);
  const skip = useRef('');
  const y0 = useRef(0);

  const openWith = useCallback((p) => {
    setParams(p || {});
    setSeed((s) => s + 1);
    setMounted(true);
    setOpen(true);
    window.setTimeout(() => {
      const el = document.getElementById('ppTo');
      if (el) {
        try {
          el.focus({ preventScroll: true });
        } catch {
          el.focus();
        }
      }
    }, 320);
  }, []);

  const close = useCallback(() => {
    skip.current = window.location.hash || '';
    setOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    try {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch {}
    window.setTimeout(() => setMounted(false), 340);
  }, []);

  useEffect(() => {
    const off = onOpenPpob((p) => {
      skip.current = '';
      openWith(p);
    });
    const sync = () => {
      const h = window.location.hash || '';
      if (h && h === skip.current) return;
      const p = parsePpobHash(h);
      if (p) openWith(p);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => {
      off();
      window.removeEventListener('hashchange', sync);
    };
  }, [openWith]);

  useEffect(() => {
    document.documentElement.classList.toggle('bs-lock', open);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <div
      className={'bs' + (open ? ' on' : '')}
      id="ppx"
      aria-hidden={!open}
      style={mounted ? undefined : { display: 'none' }}
    >
      <div className="bs-ov" data-bsx="" onClick={close} />
      <div className="bs-pn" role="dialog" aria-modal="true" aria-labelledby="bsT">
        <span className="bs-gr" aria-hidden="true" />
        <div
          className="bs-hd"
          onTouchStart={(e) => {
            y0.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            if (e.target.closest && e.target.closest('[data-bsx]')) return;
            if (e.changedTouches[0].clientY - y0.current > 70) close();
          }}
        >
          <div className="bs-hdt">
            <span className="bs-ic" aria-hidden="true">
              <Mark white className="bs-icsvg" />
            </span>
            <div>
              <h2 id="bsT">Beli Sekarang</h2>
              <p>Pilih produk, bayar cepat dengan QRIS.</p>
            </div>
          </div>
          <button type="button" className="bs-x" data-bsx="" aria-label="Tutup" onClick={close}>
            ✕
          </button>
        </div>
        <div className="bs-bd">
          <div id="ppob" className="pp ppx" aria-label="Formulir transaksi">
            {mounted ? (
              <PpobForm key={seed} init={params} />
            ) : (
              <div className="pp-body">Memuat…</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
