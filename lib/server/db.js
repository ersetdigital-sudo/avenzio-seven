// Server-only Supabase access (service role). Jangan import dari client component.
import { createClient } from '@supabase/supabase-js';

let client = null;

export function db() {
  if (!client) {
    client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
  }
  return client;
}

function fail(error) {
  const msg = (error && error.message) || 'Database error';
  const err = new Error(msg);
  err.status = 500;
  throw err;
}

export function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/* ------------------------------- products ------------------------------- */

export function toProduct(r) {
  if (!r) return null;
  return {
    slug: r.slug,
    cat: r.cat,
    prov: r.prov,
    provName: r.prov_name,
    title: r.title,
    short: r.short,
    nominal: r.nominal,
    price: r.price,
    bill: !!r.bill,
    desc: r.description,
    kind: r.kind,
    image: r.image_url || '',
    imageId: r.image_public_id || '',
    featured: !!r.featured,
    active: r.is_active !== false,
    sort: r.sort_order || 0,
  };
}

export function fromProduct(p) {
  return {
    slug: p.slug,
    cat: p.cat,
    prov: p.prov || '',
    prov_name: p.provName || p.prov_name || '',
    title: p.title,
    short: p.short || '',
    nominal: p.nominal || '',
    price: Number(p.price) || 0,
    bill: !!p.bill,
    description: p.desc || p.description || '',
    kind: p.kind || '',
    image_url: p.image || p.image_url || '',
    image_public_id: p.imageId || p.image_public_id || '',
    featured: !!p.featured,
    is_active: p.active === undefined ? p.is_active === undefined ? true : !!p.is_active : !!p.active,
    sort_order: Number(p.sort) || Number(p.sortOrder) || Number(p.sort_order) || 0,
  };
}

const PRODUCT_INPUT_MAP = {
  slug: 'slug',
  cat: 'cat',
  prov: 'prov',
  provName: 'prov_name',
  prov_name: 'prov_name',
  title: 'title',
  short: 'short',
  nominal: 'nominal',
  price: 'price',
  bill: 'bill',
  desc: 'description',
  description: 'description',
  kind: 'kind',
  image: 'image_url',
  image_url: 'image_url',
  imageId: 'image_public_id',
  image_public_id: 'image_public_id',
  featured: 'featured',
  active: 'is_active',
  is_active: 'is_active',
  sort: 'sort_order',
  sort_order: 'sort_order',
};

export async function listProducts({ includeInactive = false } = {}) {
  let q = db().from('products').select('*').order('sort_order').order('created_at');
  if (!includeInactive) q = q.eq('is_active', true);
  const { data, error } = await q;
  if (error) fail(error);
  return (data || []).map(toProduct);
}

export async function getProduct(slug) {
  const { data, error } = await db().from('products').select('*').eq('slug', slug).maybeSingle();
  if (error) fail(error);
  return toProduct(data);
}

export async function createProduct(input) {
  const row = fromProduct({ ...input, slug: input.slug || slugify(input.title) });
  if (!row.slug) {
    const err = new Error('Slug produk tidak valid');
    err.status = 400;
    throw err;
  }
  const { data, error } = await db().from('products').insert(row).select().single();
  if (error) {
    if (error.code === '23505') {
      const e = new Error('Slug sudah dipakai produk lain');
      e.status = 409;
      throw e;
    }
    fail(error);
  }
  return toProduct(data);
}

export async function updateProduct(slug, input) {
  const full = fromProduct({ ...input, slug });
  const row = {};
  // Hanya field yang benar-benar dikirim ikut diubah (mencegah field ter-reset).
  Object.keys(PRODUCT_INPUT_MAP).forEach((key) => {
    if (input[key] === undefined) return;
    const col = PRODUCT_INPUT_MAP[key];
    if (col === 'slug') return;
    row[col] = full[col];
  });
  if (Object.keys(row).length === 0) {
    const e = new Error('Tidak ada perubahan');
    e.status = 400;
    throw e;
  }
  const { data, error } = await db().from('products').update(row).eq('slug', slug).select().single();
  if (error) {
    if (error.code === 'PGRST116') {
      const e = new Error('Produk tidak ditemukan');
      e.status = 404;
      throw e;
    }
    fail(error);
  }
  return toProduct(data);
}

export async function deleteProduct(slug) {
  const { error } = await db().from('products').delete().eq('slug', slug);
  if (error) fail(error);
  return true;
}

/* --------------------------- payment methods --------------------------- */

export function toMethod(r) {
  if (!r) return null;
  return {
    id: r.id,
    name: r.name,
    accountName: r.account_name,
    accountNumber: r.account_number,
    image: r.image_url || '',
    imageId: r.image_public_id || '',
    notes: r.notes || '',
    active: r.is_active !== false,
    sort: r.sort_order || 0,
  };
}

export function fromMethod(m) {
  return {
    name: m.name,
    account_name: m.accountName || m.account_name || '',
    account_number: m.accountNumber || m.account_number || '',
    image_url: m.image || m.image_url || '',
    image_public_id: m.imageId || m.image_public_id || '',
    notes: m.notes || '',
    is_active: m.active === undefined ? m.is_active === undefined ? true : !!m.is_active : !!m.active,
    sort_order: Number(m.sort) || Number(m.sort_order) || 0,
  };
}

const METHOD_INPUT_MAP = {
  name: 'name',
  accountName: 'account_name',
  account_name: 'account_name',
  accountNumber: 'account_number',
  account_number: 'account_number',
  image: 'image_url',
  image_url: 'image_url',
  imageId: 'image_public_id',
  image_public_id: 'image_public_id',
  notes: 'notes',
  active: 'is_active',
  is_active: 'is_active',
  sort: 'sort_order',
  sort_order: 'sort_order',
};

export async function listMethods({ includeInactive = false } = {}) {
  let q = db().from('payment_methods').select('*').order('sort_order').order('created_at');
  if (!includeInactive) q = q.eq('is_active', true);
  const { data, error } = await q;
  if (error) fail(error);
  return (data || []).map(toMethod);
}

export async function createMethod(input) {
  const { data, error } = await db()
    .from('payment_methods')
    .insert(fromMethod(input))
    .select()
    .single();
  if (error) fail(error);
  return toMethod(data);
}

export async function updateMethod(id, input) {
  const full = fromMethod(input);
  const row = {};
  Object.keys(METHOD_INPUT_MAP).forEach((key) => {
    if (input[key] === undefined) return;
    row[METHOD_INPUT_MAP[key]] = full[METHOD_INPUT_MAP[key]];
  });
  if (Object.keys(row).length === 0) {
    const e = new Error('Tidak ada perubahan');
    e.status = 400;
    throw e;
  }
  const { data, error } = await db()
    .from('payment_methods')
    .update(row)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    if (error.code === 'PGRST116') {
      const e = new Error('Metode pembayaran tidak ditemukan');
      e.status = 404;
      throw e;
    }
    fail(error);
  }
  return toMethod(data);
}

export async function deleteMethod(id) {
  const { error } = await db().from('payment_methods').delete().eq('id', id);
  if (error) fail(error);
  return true;
}

/* -------------------------------- orders -------------------------------- */

export function toOrder(r) {
  if (!r) return null;
  return {
    id: r.id,
    inv: r.inv,
    slug: r.slug,
    title: r.product_title,
    to: r.target_number,
    total: r.total,
    status: r.status,
    method: r.method,
    wa: r.wa_number,
    customer: r.customer_name,
    note: r.note,
    paidAt: r.paid_at ? new Date(r.paid_at).getTime() : null,
    expires: r.expires_at ? new Date(r.expires_at).getTime() : null,
    created: r.created_at ? new Date(r.created_at).getTime() : Date.now(),
    updated: r.updated_at ? new Date(r.updated_at).getTime() : null,
  };
}

export async function listOrders({ q = '', status = '', limit = 200 } = {}) {
  let query = db().from('orders').select('*').order('created_at', { ascending: false }).limit(limit);
  if (status) query = query.eq('status', status);
  if (q) {
    const v = '%' + String(q).replace(/[%_]/g, '') + '%';
    query = query.or(`inv.ilike.${v},target_number.ilike.${v},product_title.ilike.${v},wa_number.ilike.${v}`);
  }
  const { data, error } = await query;
  if (error) fail(error);
  return (data || []).map(toOrder);
}

export async function getOrder(inv, { withToken = false } = {}) {
  const { data, error } = await db().from('orders').select('*').eq('inv', String(inv).toUpperCase()).maybeSingle();
  if (error) fail(error);
  const o = toOrder(data);
  if (o && withToken && data) o.ownerToken = data.owner_token;
  return o;
}

export async function insertOrder(input) {
  const row = {
    inv: String(input.inv || '').toUpperCase(),
    slug: input.slug || '',
    product_title: input.title || '',
    target_number: input.to || '',
    total: Number(input.total) || 0,
    status: input.status || 'menunggu',
    method: input.method || 'QRIS',
    wa_number: input.wa || '',
    customer_name: input.customer || '',
    note: input.note || '',
    owner_token: input.ownerToken || '',
    expires_at: input.expires ? new Date(input.expires).toISOString() : null,
  };
  const { data, error } = await db()
    .from('orders')
    .upsert(row, { onConflict: 'inv', ignoreDuplicates: false })
    .select()
    .single();
  if (error) fail(error);
  return toOrder(data);
}

const ORDER_FIELDS = {
  status: 'status',
  wa: 'wa_number',
  customer: 'customer_name',
  note: 'note',
  title: 'product_title',
  total: 'total',
  method: 'method',
};

export async function updateOrder(inv, patch) {
  const row = {};
  Object.keys(ORDER_FIELDS).forEach((k) => {
    if (patch[k] !== undefined) row[ORDER_FIELDS[k]] = k === 'total' ? Number(patch[k]) || 0 : patch[k];
  });
  if (patch.status === 'berhasil' && !row.paid_at) row.paid_at = new Date().toISOString();
  if (Object.keys(row).length === 0) {
    const e = new Error('Tidak ada perubahan');
    e.status = 400;
    throw e;
  }
  const { data, error } = await db()
    .from('orders')
    .update(row)
    .eq('inv', String(inv).toUpperCase())
    .select()
    .single();
  if (error) {
    if (error.code === 'PGRST116') {
      const e = new Error('Invoice tidak ditemukan');
      e.status = 404;
      throw e;
    }
    fail(error);
  }
  return toOrder(data);
}

export async function getOrderToken(inv) {
  const { data, error } = await db()
    .from('orders')
    .select('owner_token')
    .eq('inv', String(inv).toUpperCase())
    .maybeSingle();
  if (error) fail(error);
  return data ? data.owner_token : null;
}

/* -------------------------------- stats -------------------------------- */

export async function adminStats() {
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  const [all, today, products, methods] = await Promise.all([
    db().from('orders').select('status'),
    db().from('orders').select('inv').gte('created_at', since.toISOString()),
    db().from('products').select('slug', { count: 'exact', head: true }),
    db().from('payment_methods').select('id', { count: 'exact', head: true }),
  ]);
  if (all.error) fail(all.error);
  if (today.error) fail(today.error);
  const byStatus = {};
  (all.data || []).forEach((r) => {
    byStatus[r.status] = (byStatus[r.status] || 0) + 1;
  });
  return {
    total: (all.data || []).length,
    today: (today.data || []).length,
    products: products.count || 0,
    methods: methods.count || 0,
    byStatus,
  };
}
