import { isAdmin } from '@/lib/server/adminAuth';
import { jsonError, badRequest } from '@/lib/server/api';
import { updateMethod, deleteMethod } from '@/lib/server/db';

export async function PUT(req, { params }) {
  try {
    if (!(await isAdmin())) throw badRequest('Unauthorized', 401);
    const { id } = await params;
    const body = await req.json();
    if (!String(body.name || '').trim()) throw badRequest('Nama metode wajib diisi');
    const item = await updateMethod(id, body);
    return Response.json({ item });
  } catch (e) {
    return jsonError(e);
  }
}

export async function DELETE(_req, { params }) {
  try {
    if (!(await isAdmin())) throw badRequest('Unauthorized', 401);
    const { id } = await params;
    await deleteMethod(id);
    return Response.json({ ok: true });
  } catch (e) {
    return jsonError(e);
  }
}
