import ProductForm from '@/components/admin/ProductForm';

export const metadata = { title: 'Produk Baru' };

export default function NewProductPage() {
  return (
    <>
      <div className="av-hd">
        <div>
          <div className="aeye">
            <i />
            Katalog
          </div>
          <h1>Tambah produk</h1>
          <p>Isi detail produk, harga otomatis terformat Rupiah.</p>
        </div>
      </div>
      <ProductForm />
    </>
  );
}
