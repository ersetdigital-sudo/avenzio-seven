import { cookies } from 'next/headers';
import { ADMIN_COOKIE, cookieOptions } from '@/lib/server/adminAuth';

export async function POST() {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, '', { ...cookieOptions, maxAge: 0 });
  return Response.json({ ok: true });
}
