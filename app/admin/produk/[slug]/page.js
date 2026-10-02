import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { getProduct } from '@/lib/server/db';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Edit Produk' };

export default async function EditProductPage({ params }) {
  const { slug } = await params;
  let item = null;
  try {
    item = await getProduct(slug);
  } catch {
    item = null;
  }
  if (!item) notFound();

  return (
    <>
      <div className="av-hd">
        <div>
          <h1>Edit produk</h1>
          <p>{item.title}</p>
        </div>
      </div>
      <ProductForm initial={item} />
    </>
  );
}
