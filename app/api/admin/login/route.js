import { cookies } from 'next/headers';
import { ADMIN_COOKIE, cookieOptions, createToken, checkPassword } from '@/lib/server/adminAuth';
import { jsonError, badRequest } from '@/lib/server/api';

export async function POST(req) {
  try {
    const body = await req.json();
    if (!checkPassword(body.password)) throw badRequest('Password salah', 401);
    const jar = await cookies();
    jar.set(ADMIN_COOKIE, createToken(), cookieOptions);
    return Response.json({ ok: true });
  } catch (e) {
    return jsonError(e);
  }
}
