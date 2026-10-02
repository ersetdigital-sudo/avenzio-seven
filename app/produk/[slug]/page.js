import { notFound } from 'next/navigation';
import ProductView from '@/components/ProductView';
import { BY_SLUG, FIELDS, PRODUCTS } from '@/lib/catalog';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = BY_SLUG[slug];
  if (!p) return {};
  return { title: p.title, description: p.desc };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = BY_SLUG[slug];
  if (!p) notFound();

  const field = FIELDS[p.cat];
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
    rx: field[2],
    placeholder: field[1],
    hint: field[3],
  };

  return <ProductView product={product} />;
}
