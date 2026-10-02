import { isAdmin } from '@/lib/server/adminAuth';
import { jsonError, badRequest } from '@/lib/server/api';
import { listProducts, createProduct } from '@/lib/server/db';

export async function GET() {
  try {
    const includeInactive = await isAdmin();
    const items = await listProducts({ includeInactive });
    return Response.json({ items });
  } catch (e) {
    return jsonError(e);
  }
}

export async function POST(req) {
  try {
    if (!(await isAdmin())) throw badRequest('Unauthorized', 401);
    const body = await req.json();
    if (!String(body.title || '').trim()) throw badRequest('Nama produk wajib diisi');
    if (!String(body.cat || '').trim()) throw badRequest('Kategori wajib dipilih');
    const price = Number(body.price);
    if (!Number.isFinite(price) || price < 0) throw badRequest('Harga tidak valid');
    const item = await createProduct({ ...body, price: Math.round(price) });
    return Response.json({ item }, { status: 201 });
  } catch (e) {
    return jsonError(e);
  }
}
