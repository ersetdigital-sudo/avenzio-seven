// Cookie admin (HMAC) — server only.
import crypto from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'av_admin';
const TTL_MS = 8 * 60 * 60 * 1000; //8 jam

function secret() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.ADMIN_PASSWORD || 'avenzio';
}

function hmac(v) {
  return crypto.createHmac('sha256', secret()).update(v).digest('base64url');
}

export function createToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + TTL_MS })).toString('base64url');
  return payload + '.' + hmac(payload);
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const i = token.lastIndexOf('.');
  if (i < 0) return null;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = hmac(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data.exp || Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  maxAge: TTL_MS / 1000,
  // Aktifkan kalau deploy di HTTPS: ADMIN_COOKIE_SECURE=1
  secure: process.env.ADMIN_COOKIE_SECURE === '1',
};

export async function isAdmin() {
  const jar = await cookies();
  return !!verifyToken(jar.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    const e = new Error('Unauthorized');
    e.status = 401;
    throw e;
  }
}

export function checkPassword(pw) {
  const expected = String(process.env.ADMIN_PASSWORD || '');
  const a = Buffer.from(String(pw || ''));
  const b = Buffer.from(expected);
  if (!expected || a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
