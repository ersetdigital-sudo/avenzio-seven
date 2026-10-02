import { isAdmin, requireAdmin } from '@/lib/server/adminAuth';
import { jsonError, badRequest } from '@/lib/server/api';
import { listOrders, getOrder, getOrderToken, insertOrder, updateOrder } from '@/lib/server/db';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const inv = url.searchParams.get('inv');

    // Lookup publik: cukup dengan nomor invoice yang tepat.
    if (inv) {
      const item = await getOrder(inv);
      if (!item) throw badRequest('Invoice tidak ditemukan', 404);
      return Response.json({ item });
    }

    await requireAdmin();
    const items = await listOrders({
      q: url.searchParams.get('q') || '',
      status: url.searchParams.get('status') || '',
      limit: Number(url.searchParams.get('limit')) || 200,
    });
    return Response.json({ items });
  } catch (e) {
    return jsonError(e);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!String(body.inv || '').trim()) throw badRequest('Invoice wajib diisi');
    if (!Number.isFinite(Number(body.total))) throw badRequest('Total tidak valid');
    const item = await insertOrder(body);
    return Response.json({ item }, { status: 201 });
  } catch (e) {
    return jsonError(e);
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const inv = String(body.inv || '').trim();
    if (!inv) throw badRequest('Invoice wajib diisi');

    const admin = await isAdmin();
    if (!admin) {
      const token = await getOrderToken(inv);
      if (!token || !body.ownerToken || token !== body.ownerToken) {
        throw badRequest('Unauthorized', 401);
      }
    }

    const item = await updateOrder(inv, body);
    return Response.json({ item });
  } catch (e) {
    return jsonError(e);
  }
}
