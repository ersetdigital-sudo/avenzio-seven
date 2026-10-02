import { isAdmin } from '@/lib/server/adminAuth';
import { jsonError, badRequest } from '@/lib/server/api';
import { listMethods, createMethod } from '@/lib/server/db';

export function assertQrisReady(body) {
  const name = String(body.name || '');
  const active =
    body.active === undefined
      ? body.is_active === undefined
        ? true
        : !!body.is_active
      : !!body.active;
  const image = body.image || body.image_url || '';
  if (/qris/i.test(name) && active && !image) {
    throw badRequest('Foto QRIS wajib diupload sebelum QRIS diaktifkan.');
  }
}

export async function GET() {
  try {
    const includeInactive = await isAdmin();
    const items = await listMethods({ includeInactive });
    return Response.json({ items });
  } catch (e) {
    return jsonError(e);
  }
}

export async function POST(req) {
  try {
    if (!(await isAdmin())) throw badRequest('Unauthorized', 401);
    const body = await req.json();
    if (!String(body.name || '').trim()) throw badRequest('Nama metode wajib diisi');
    assertQrisReady(body);
    const item = await createMethod(body);
    return Response.json({ item }, { status: 201 });
  } catch (e) {
    return jsonError(e);
  }
}
