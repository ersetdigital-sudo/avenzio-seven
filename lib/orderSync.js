// Sinkronisasi pesanan browser <-> Supabase (diam-diam, tidak menghalangi UI).
import { sget, sset } from './storage';

function ownerToken(inv) {
  const key = 'av_own_' + inv;
  let t = sget(key);
  if (!t) {
    t = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    sset(key, t);
  }
  return t;
}

export async function pushOrder(order) {
  try {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...order, ownerToken: ownerToken(order.inv) }),
    });
  } catch {
    /* offline: pesanan tetap tersimpan lokal */
  }
}

export async function pushStatus(inv, status) {
  try {
    await fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inv, status, ownerToken: ownerToken(inv) }),
    });
  } catch {}
}

export async function fetchRemoteOrder(inv) {
  try {
    const res = await fetch('/api/orders?inv=' + encodeURIComponent(inv));
    if (!res.ok) return null;
    const data = await res.json();
    return data.item || null;
  } catch {
    return null;
  }
}
