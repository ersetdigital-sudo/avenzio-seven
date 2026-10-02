import Link from 'next/link';
import PpobLink from '@/components/PpobLink';

export const metadata = { title: 'Panduan Pembayaran' };

const STEPS = [
  {
    n: '01',
    d: '<rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect>',
    b: 'Pilih produk',
    p: 'Cari produk di Katalog atau gunakan pencarian di beranda.',
  },
  {
    n: '02',
    d: '<rect x="6" y="2" width="12" height="20" rx="2.5"></rect><path d="M11 18h2"></path>',
    b: 'Masukkan nomor tujuan',
    p: 'Isi nomor HP, nomor meter, atau ID pelanggan dengan benar.',
  },
  {
    n: '03',
    d: '<path d="M6 6h15l-1.5 9h-12z"></path><path d="M6 6 5 3H2"></path><circle cx="9" cy="20" r="1.4"></circle><circle cx="18" cy="20" r="1.4"></circle>',
    b: 'Lanjut ke checkout',
    p: 'Periksa detail pesanan dan total pembayaran.',
  },
  {
    n: '04',
    d: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM18 14h2M14 18v2"></path>',
    b: 'Scan QRIS',
    p: 'Buka aplikasi mobile banking atau e-wallet, lalu scan kode QRIS.',
  },
  {
    n: '05',
    d: '<circle cx="12" cy="12" r="9"></circle><path d="m8 12 3 3 5-6"></path>',
    b: 'Tunggu status pembayaran',
    p: 'Status diperbarui setelah pembayaran terkonfirmasi. Simpan nomor invoice.',
  },
];

export default function PanduanPembayaranPage() {
  return (
    <>
      <section className="aph">
        <div className="awrap">
          <div className="aeye">
            <i />
            Panduan
          </div>
          <h1>Panduan Pembayaran QRIS</h1>
          <p>
            Bayar dengan aplikasi mobile banking atau e-wallet favoritmu dalam lima langkah.
          </p>
        </div>
      </section>

      <section className="awrap asec-tight">
        <ol className="gd">
          {STEPS.map((s) => (
            <li className="gd-s" key={s.n}>
              <span className="gd-n">{s.n}</span>
              <span className="gd-ic">
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  dangerouslySetInnerHTML={{ __html: s.d }}
                />
              </span>
              <div>
                <b>{s.b}</b>
                <p>{s.p}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="abox faq-cta">
          <div>
            <b>Siap bertransaksi?</b>
            <p>Mulai dari katalog atau cek status pesananmu.</p>
          </div>
          <div className="abtns">
            <PpobLink className="abtn abtn-g" href="/#ppob">
              Buka Katalog
            </PpobLink>
            <Link className="abtn abtn-o" href="/cek-pesanan">
              Cek Pesanan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
