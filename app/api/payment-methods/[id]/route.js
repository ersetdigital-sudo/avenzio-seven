import { isAdmin } from '@/lib/server/adminAuth';
import { jsonError, badRequest } from '@/lib/server/api';
import { listMethods, updateMethod, deleteMethod } from '@/lib/server/db';
import { assertQrisReady } from '../route';

export async function PUT(req, { params }) {
  try {
    if (!(await isAdmin())) throw badRequest('Unauthorized', 401);
    const { id } = await params;
    const body = await req.json();
    if (body.name !== undefined && !String(body.name || '').trim()) {
      throw badRequest('Nama metode wajib diisi');
    }
    // Validasi QRIS memakai data gabungan (lama + perubahan) agar tidak ada
    // QRIS aktif tanpa foto tersimpan di Supabase.
    const all = await listMethods({ includeInactive: true });
    const existing = all.find((x) => x.id === id);
    if (!existing) throw badRequest('Metode pembayaran tidak ditemukan', 404);
    assertQrisReady({ ...existing, ...body });
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
