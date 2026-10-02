import { notFound } from 'next/navigation';
import ProductView from '@/components/ProductView';
import { BY_SLUG as FALLBACK_BY_SLUG, FIELDS, PRODUCTS as FALLBACK } from '@/lib/catalog';
import { getProduct, listProducts } from '@/lib/server/db';

export const revalidate = 30;

/** Produk dari Supabase (admin), fallback ke catalog.js kalau DB gagal. */
async function loadProduct(slug) {
  try {
    const p = await getProduct(slug);
    if (p && p.active) return p;
  } catch {}
  return FALLBACK_BY_SLUG[slug] || null;
}

export async function generateStaticParams() {
  try {
    const items = await listProducts();
    if (items.length) return items.map((p) => ({ slug: p.slug }));
  } catch {}
  return FALLBACK.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await loadProduct(slug);
  if (!p) return {};
  return { title: p.title, description: p.desc };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = await loadProduct(slug);
  if (!p) notFound();

  const field = FIELDS[p.cat] || ['', '', '^.{1,}$', 'Isi data sesuai ketentuan.', ''];
  const product = {
    slug: p.slug,
    cat: p.cat,
    prov: p.prov,
    provName: p.provName,
    title: p.title,
    short: p.short,
    nominal: p.nominal,
    price: p.price,
    bill: !!p.bill,
    desc: p.desc,
    kind: p.kind,
    image: p.image || '',
    rx: field[2],
    placeholder: field[1],
    hint: field[3],
  };

  return <ProductView product={product} />;
}
