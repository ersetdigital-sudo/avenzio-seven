'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BY_SLUG,
  CATS,
  CATS_WITH_PRODUCTS,
  FIELDS,
  PHONE_CATS,
  PHONE_PREFIX,
  PRODUCTS,
  PROVS,
} from '@/lib/catalog';
import { rp } from '@/lib/format';
import { newPpobInvoice, saveOrder, setLast } from '@/lib/orders';
import { PpLogo } from './Logo';
import PpobPayScreen from './PpobPayScreen';

function detectProv(num) {
  const f = String(num).slice(0, 4);
  for (const k of Object.keys(PHONE_PREFIX)) {
    if (PHONE_PREFIX[k].indexOf(f) > -1) return k;
  }
  return null;
}

function providerList(cat) {
  const out = [];
  PRODUCTS.forEach((p) => {
    if (p.cat === cat && out.indexOf(p.prov) < 0) out.push(p.prov);
  });
  return out;
}

/**
 * The PPOB transaction widget (legacy `ppob.js`). Renders the category tabs,
 * destination input, product grid and the "Bayar" bar; opens the QRIS overlay.
 */
export default function PpobForm({ init = {} }) {
  const cats = CATS_WITH_PRODUCTS;

  // Initial state is derived once per mount; parents remount with a new `key`
  // when they want to reopen the widget with different params.
  const start = useMemo(() => {
    const p = init.p ? BY_SLUG[init.p] : null;
    const cat = p
      ? p.cat
      : init.cat && cats.indexOf(init.cat) > -1
        ? init.cat
        : cats[0];
    return {
      cat,
      to: String(init.to || '').replace(/\D/g, ''),
      prov: p ? p.prov : null,
      sel: p ? init.p : null,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [cat, setCat] = useState(start.cat);
  const [to, setTo] = useState(start.to);
  const [prov, setProv] = useState(start.prov);
  const [sel, setSel] = useState(start.sel);
  const [err, setErr] = useState('');
  const [pay, setPay] = useState(null);
  const inputRef = useRef(null);
  const tabsRef = useRef(null);

  // Pastikan tab kategori yang aktif selalu terlihat (rail bisa bergeser).
  useEffect(() => {
    const rail = tabsRef.current;
    if (!rail) return;
    const active = rail.querySelector('button.on');
    if (!active) return;
    const target = active.offsetLeft - 16;
    if (rail.scrollTo) rail.scrollTo({ left: target, behavior: 'smooth' });
    else rail.scrollLeft = target;
  }, [cat]);

  const field = FIELDS[cat];
  const phoneCat = !!PHONE_CATS[cat];
  const valid = new RegExp(field[2]).test(to);

  const pv = phoneCat ? [] : providerList(cat);
  const activeProv = phoneCat
    ? detectProv(to)
    : prov && pv.indexOf(prov) > -1
      ? prov
      : pv[0];

  const items = useMemo(() => {
    if (phoneCat) {
      return activeProv
        ? PRODUCTS.filter((p) => p.cat === cat && p.prov === activeProv)
        : [];
    }
    return PRODUCTS.filter((p) => p.cat === cat && p.prov === activeProv);
  }, [cat, activeProv, phoneCat]);

  const sp = items.find((p) => p.slug === sel) || null;

  function startPayment(product) {
    const inv = newPpobInvoice();
    const exp = Date.now() + 15 * 60000;
    saveOrder({
      inv,
      slug: product.slug,
      to,
      total: product.price,
      created: Date.now(),
      expires: exp,
      status: 'menunggu',
    });
    setLast(inv);
    setPay({ inv, exp, slug: product.slug });
  }

  // Product pages mount with { pay: true } — go straight to the QRIS overlay.
  const launched = useRef(false);
  useEffect(() => {
    if (launched.current || !init.pay) return;
    launched.current = true;
    const selected = items.find((p) => p.slug === sel);
    if (selected && valid && (!phoneCat || detectProv(to) === selected.prov)) {
      startPayment(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selectCat(next) {
    if (next === cat) return;
    setCat(next);
    setSel(null);
    setProv(null);
    setErr('');
    if (!PHONE_CATS[next] || !/^08/.test(to)) setTo('');
  }

  function goPay() {
    if (!valid) {
      setErr('Periksa kembali: ' + field[3]);
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    if (!sp) {
      setErr(
        'Pilih ' + (items[0] && items[0].bill ? 'tagihan' : 'nominal') + ' terlebih dahulu.'
      );
      return;
    }
    setErr('');
    startPayment(sp);
  }

  return (
    <>
      <div className="pp-tabs" role="tablist" ref={tabsRef}>
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={c === cat}
            className={c === cat ? 'on' : ''}
            onClick={() => selectCat(c)}
          >
            {CATS[c]}
          </button>
        ))}
      </div>

      <div className="pp-body">
        <label className="pp-lab" htmlFor="ppTo">
          {field[0]}
        </label>
        <div className="pp-in">
          {phoneCat && activeProv ? <PpLogo prov={activeProv} /> : null}
          <input
            id="ppTo"
            ref={inputRef}
            inputMode="numeric"
            autoComplete="tel"
            maxLength={16}
            placeholder={field[1]}
            value={to}
            onChange={(e) => setTo(e.target.value.replace(/\D/g, ''))}
          />
        </div>
        <p className={'pp-hint' + (err ? ' err' : '')} id="ppHint">
          {err || field[3]}
        </p>

        {!phoneCat && pv.length > 1 ? (
          <>
            <div className="pp-lab">Pilih layanan</div>
            <div className="pp-chips">
              {pv.map((k) => (
                <button
                  key={k}
                  type="button"
                  data-prov={k}
                  className={k === activeProv ? 'on' : ''}
                  onClick={() => {
                    setProv(k);
                    setSel(null);
                  }}
                >
                  <PpLogo prov={k} />
                  {PROVS[k][0]}
                </button>
              ))}
            </div>
          </>
        ) : null}

        <div className="pp-lab">
          {items.length && items[0].bill ? 'Pilih tagihan' : 'Pilih nominal'}
        </div>

        {!items.length ? (
          <div className="pp-empty">
            <span className="pp-empty-ic" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.2-3.2" />
              </svg>
            </span>
            {phoneCat ? (
              to.length >= 4 ? (
                <>
                  <b>Operator tidak dikenali</b>
                  <p>Periksa kembali nomor kamu, atau pilih kategori lain.</p>
                </>
              ) : (
                <>
                  <b>Masukkan nomor HP</b>
                  <p>Operator akan terdeteksi otomatis begitu kamu mengetik nomornya.</p>
                </>
              )
            ) : (
              <>
                <b>Produk belum tersedia</b>
                <p>Coba pilih kategori atau layanan lainnya.</p>
              </>
            )}
          </div>
        ) : (
          <div className="pp-grid">
            {items.map((p) => (
              <button
                key={p.slug}
                type="button"
                data-p={p.slug}
                className={'pp-nom' + (p.slug === sel ? ' on' : '')}
                onClick={() => setSel(p.slug)}
              >
                <b>{p.bill ? p.short || p.title : p.nominal}</b>
                <span>{p.bill ? 'Biaya admin ' + rp(p.price) : 'Harga ' + rp(p.price)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pp-bar">
        <div>
          <small>{sp && sp.bill ? 'Biaya admin · tagihan dicek setelah ini' : 'Total'}</small>
          <b>{sp ? rp(sp.price) : 'Rp0'}</b>
        </div>
        <button type="button" className="abtn abtn-g pp-go" id="ppGo" onClick={goPay}>
          Bayar
        </button>
      </div>

      {pay ? (
        <PpobPayScreen
          inv={pay.inv}
          exp={pay.exp}
          slug={pay.slug}
          to={to}
          onClose={() => setPay(null)}
        />
      ) : null}
    </>
  );
}
