import Link from 'next/link';

export const metadata = { title: 'Halaman tidak ditemukan' };

export default function NotFound() {
  return (
    <section className="awrap" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <div className="aempty">
        <b>Halaman tidak ditemukan</b>
        <p>Alamat yang kamu buka mungkin sudah dipindahkan atau tidak pernah ada.</p>
        <Link className="abtn abtn-p" href="/">
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}
