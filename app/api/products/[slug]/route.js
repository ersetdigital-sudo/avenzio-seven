import { isAdmin } from '@/lib/server/adminAuth';
import { jsonError, badRequest } from '@/lib/server/api';
import { getProduct, updateProduct, deleteProduct } from '@/lib/server/db';

export async function GET(_req, { params }) {
  try {
    const { slug } = await params;
    const item = await getProduct(slug);
    if (!item) throw badRequest('Produk tidak ditemukan', 404);
    if (!item.active && !(await isAdmin())) throw badRequest('Produk tidak ditemukan', 404);
    return Response.json({ item });
  } catch (e) {
    return jsonError(e);
  }
}

export async function PUT(req, { params }) {
  try {
    if (!(await isAdmin())) throw badRequest('Unauthorized', 401);
    const { slug } = await params;
    const body = await req.json();
    if (!String(body.title || '').trim()) throw badRequest('Nama produk wajib diisi');
    const price = Number(body.price);
    if (!Number.isFinite(price) || price < 0) throw badRequest('Harga tidak valid');
    const item = await updateProduct(slug, { ...body, price: Math.round(price) });
    return Response.json({ item });
  } catch (e) {
    return jsonError(e);
  }
}

export async function DELETE(_req, { params }) {
  try {
    if (!(await isAdmin())) throw badRequest('Unauthorized', 401);
    const { slug } = await params;
    await deleteProduct(slug);
    return Response.json({ ok: true });
  } catch (e) {
    return jsonError(e);
  }
}
