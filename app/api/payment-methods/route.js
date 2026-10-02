import { isAdmin } from '@/lib/server/adminAuth';
import { jsonError, badRequest } from '@/lib/server/api';
import { listMethods, createMethod } from '@/lib/server/db';

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
    const item = await createMethod(body);
    return Response.json({ item }, { status: 201 });
  } catch (e) {
    return jsonError(e);
  }
}
