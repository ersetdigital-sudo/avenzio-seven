// Helper optimasi URL Cloudinary (aman dipakai di client & server).
// Tambahkan f_auto,q_auto[,w,h,c_fill] ke URL upload apa pun.

const BASE = '/image/upload/';
const DEFAULTS = 'f_auto,q_auto';

function hasTransform(url) {
  // URL Cloudinary: .../image/upload/{transformasi}/v123/xxx.jpg
  const i = url.indexOf(BASE);
  if (i < 0) return false;
  const first = url.slice(i + BASE.length).split('/')[0];
  return !/^v\d+$/.test(first);
}

/**
 * cld(url)                          -> auto format + auto quality
 * cld(url, { w: 800 })              -> + width800
 * cld(url, { w: 800, h: 600 })      -> + crop fill
 * cld(url, { w: 0 })                -> kembalikan URL asli
 */
export function cld(url, opts = {}) {
  const src = String(url || '');
  if (!src || src.indexOf(BASE) < 0 || hasTransform(src)) return src;
  const parts = [DEFAULTS];
  const { w, h } = opts;
  if (w || h) {
    if (w) parts.push('w_' + Math.round(w));
    if (h) parts.push('h_' + Math.round(h));
    if (w && h) parts.push('c_fill');
  }
  return src.replace(BASE, BASE + parts.join(',') + '/');
}

/** Sisipkan transformasi tambahan (mis. w_400) di depan URL upload. */
export function cldWith(url, transform) {
  const src = String(url || '');
  if (!src || src.indexOf(BASE) < 0 || hasTransform(src)) return src;
  return src.replace(BASE, BASE + transform + '/');
}

/** Parse Cloudinary secure_url -> public_id (untuk hapus aset lama). */
export function publicIdFrom(url) {
  const src = String(url || '');
  const i = src.indexOf(BASE);
  if (i < 0) return '';
  const rest = src.slice(i + BASE.length).split('?')[0];
  const segs = rest.split('/');
  const last = segs[segs.length - 1];
  return rest.slice(0, rest.length - last.length - 1).replace(/\/$/, '');
}

export const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'lkx4drmd';
export const MAX_FILE_SIZE = 2 * 1024 * 1024; //2MB
export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function validateImage(file) {
  if (!file) return 'Pilih gambar terlebih dahulu.';
  if (!ACCEPTED_TYPES.includes(file.type)) return 'Format harus JPG, PNG, atau WEBP.';
  if (file.size > MAX_FILE_SIZE) return 'Ukuran maksimal 2MB.';
  return '';
}
