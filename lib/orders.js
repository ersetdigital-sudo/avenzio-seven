// Orders are kept on this device until a backend / payment gateway is connected.
import { sget, sset } from './storage';

export const ORDER_STATUS = {
  menunggu: 'Menunggu Pembayaran',
  diproses: 'Diproses',
  berhasil: 'Berhasil',
  gagal: 'Gagal',
  kedaluwarsa: 'Kedaluwarsa',
};

export function orders() {
  try {
    return JSON.parse(sget('av_orders') || '{}') || {};
  } catch {
    return {};
  }
}

export function saveOrder(order) {
  const all = orders();
  all[order.inv] = order;
  sset('av_orders', JSON.stringify(all));
}

export function getOrder(inv) {
  const key = String(inv || '').trim().toUpperCase();
  const order = orders()[key];
  if (order && order.status === 'menunggu' && Date.now() > order.expires) {
    order.status = 'kedaluwarsa';
    saveOrder(order);
  }
  return order;
}

/**
 * Invoice for the checkout flow: INV-YYYYMMDD-0001 + 2 random digits.
 */
export function newInvoice() {
  const d = new Date();
  const y = d.getFullYear();
  const m = ('0' + (d.getMonth() + 1)).slice(-2);
  const dd = ('0' + d.getDate()).slice(-2);
  const prefix = 'INV-' + y + m + dd;
  const seq =
    Object.keys(orders()).filter((k) => k.indexOf(prefix) === 0).length + 1;
  return (
    prefix +
    '-' +
    ('000' + seq).slice(-4) +
    String(Math.floor(Math.random() * 90 + 10))
  );
}

/** Invoice for the PPOB sheet: INV-YYYYMMDD-1234 (random). */
export function newPpobInvoice() {
  const d = new Date();
  return (
    'INV-' +
    d.getFullYear() +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    ('0' + d.getDate()).slice(-2) +
    '-' +
    String(Math.floor(Math.random() * 9000 + 1000))
  );
}

/* ---- pending (product page -> checkout hand-off) ---- */
export function setPending(obj) {
  sset('av_pending', JSON.stringify(obj));
}

export function getPending() {
  try {
    return JSON.parse(sget('av_pending') || '{}') || {};
  } catch {
    return {};
  }
}

export function setLast(inv) {
  sset('av_last', inv);
}

export function getLast() {
  return sget('av_last') || '';
}
