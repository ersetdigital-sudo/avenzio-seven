import Link from 'next/link';
import Faq from '@/components/Faq';

export const metadata = { title: 'FAQ' };

const SECTIONS = [
  {
    id: 'pembelian',
    title: 'Pembelian',
    items: [
      [
        'Bagaimana cara membeli produk?',
        'Pilih produk di Katalog, masukkan nomor tujuan, lalu lanjut ke checkout dan bayar dengan QRIS.',
      ],
      ['Apakah perlu membuat akun?', 'Tidak. Kamu bisa langsung bertransaksi tanpa daftar akun.'],
    ],
  },
  {
    id: 'pembayaran',
    title: 'Pembayaran',
    items: [
      [
        'Metode pembayaran apa saja yang tersedia?',
        'Saat ini pembayaran menggunakan QRIS, yang bisa dibayar lewat aplikasi mobile banking atau e-wallet.',
      ],
      [
        'Apakah ada biaya tambahan?',
        'Total yang tampil di checkout adalah jumlah yang kamu bayar. Untuk produk tagihan, biaya admin ditampilkan terpisah.',
      ],
    ],
  },
  {
    id: 'qris',
    title: 'QRIS',
    items: [
      [
        'Aplikasi apa saja yang bisa scan QRIS?',
        'Semua aplikasi mobile banking dan e-wallet yang mendukung QRIS.',
      ],
      [
        'Berapa lama QRIS berlaku?',
        'Kode QRIS berlaku 15 menit. Setelah itu transaksi kedaluwarsa dan kamu perlu membuat pesanan baru.',
      ],
    ],
  },
  {
    id: 'transaksi',
    title: 'Transaksi',
    items: [
      [
        'Berapa lama pesanan diproses?',
        'Sebagian besar produk diproses otomatis dalam beberapa menit setelah pembayaran terkonfirmasi.',
      ],
      [
        'Bagaimana cara cek status pesanan?',
        'Buka halaman Cek Pesanan dan masukkan nomor invoice kamu.',
      ],
    ],
  },
  {
    id: 'produk',
    title: 'Produk',
    items: [
      [
        'Salah memasukkan nomor tujuan, bagaimana?',
        'Segera hubungi WhatsApp CS dengan menyertakan nomor invoice agar bisa kami bantu cek.',
      ],
      ['Kapan token PLN dikirim?', 'Kode token tampil di detail transaksi setelah status Berhasil.'],
    ],
  },
  {
    id: 'refund',
    title: 'Refund',
    items: [
      [
        'Kapan dana bisa dikembalikan?',
        'Jika transaksi gagal setelah pembayaran terkonfirmasi, tim kami akan memproses pengembalian dana sesuai ketentuan.',
      ],
      [
        'Bagaimana cara mengajukan refund?',
        'Hubungi WhatsApp CS dengan nomor invoice dan bukti pembayaran.',
      ],
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="aph">
        <div className="awrap">
          <div className="aeye">
            <i />
            Bantuan
          </div>
          <h1>Pertanyaan Umum</h1>
          <p>Jawaban singkat untuk pertanyaan yang paling sering ditanyakan.</p>
        </div>
      </section>

      <section className="awrap faqp">
        <nav className="faqnav atabs atabs-scroll" aria-label="Kategori FAQ">
          {SECTIONS.map((s) => (
            <a key={s.id} href={'#' + s.id}>
              {s.title}
            </a>
          ))}
        </nav>
        <div>
          {SECTIONS.map((s) => (
            <div className="faqc" id={s.id} key={s.id}>
              <h2>{s.title}</h2>
              <div className="afq-list">
                {s.items.map(([q, a]) => (
                  <Faq key={q} q={q}>
                    {a}
                  </Faq>
                ))}
              </div>
            </div>
          ))}
          <div className="abox faq-cta">
            <div>
              <b>Masih butuh bantuan?</b>
              <p>Tim kami siap membantu lewat WhatsApp.</p>
            </div>
            <Link className="abtn abtn-p" href="/hubungi-kami">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
