import Link from 'next/link';
import CopyButton from '@/components/CopyButton';
import Faq from '@/components/Faq';
import HomeProducts from '@/components/HomeProducts';
import PpobLink from '@/components/PpobLink';
import PpobSheet from '@/components/PpobSheet';
import { WA_DEFAULT, wa } from '@/lib/site';

export const metadata = {
  title: { absolute: 'Avenzio Seven — Marketplace Kebutuhan Digital' },
};

const CATEGORY_ICONS = {
  pulsa:
    '<rect x="6.5" y="2" width="11" height="20" rx="3" fill="currentColor" fill-opacity=".25"></rect><rect x="6.5" y="2" width="11" height="20" rx="3"></rect><path d="M10.5 18.5h3"></path>',
  'paket-data':
    '<path d="M12 20.5 3 9.6a13.5 13.5 0 0 1 18 0z" fill="currentColor" fill-opacity=".25" stroke="none"></path><path d="M2.5 8.5a14 14 0 0 1 19 0M5.5 12a9.5 9.5 0 0 1 13 0M8.6 15.4a5 5 0 0 1 6.8 0"></path><circle cx="12" cy="19" r="1.3" fill="currentColor"></circle>',
  pln: '<path d="M13.5 2 4.5 13.5h6.5L10 22l9.5-12H13z" fill="currentColor" fill-opacity=".25"></path><path d="M13.5 2 4.5 13.5h6.5L10 22l9.5-12H13z"></path>',
  pdam:
    '<path d="M12 2.8s7 7.4 7 12.2a7 7 0 0 1-14 0C5 10.2 12 2.8 12 2.8z" fill="currentColor" fill-opacity=".25"></path><path d="M12 2.8s7 7.4 7 12.2a7 7 0 0 1-14 0C5 10.2 12 2.8 12 2.8z"></path><path d="M9 15.5a3 3 0 0 0 3 3"></path>',
  bpjs:
    '<path d="M12 2.5 4 5.5v6c0 5.2 3.4 8.6 8 10 4.6-1.4 8-4.8 8-10v-6z" fill="currentColor" fill-opacity=".25"></path><path d="M12 2.5 4 5.5v6c0 5.2 3.4 8.6 8 10 4.6-1.4 8-4.8 8-10v-6z"></path><path d="m8.8 12 2.2 2.2 4.2-4.4"></path>',
  'internet-tv':
    '<rect x="2.5" y="4.5" width="19" height="13" rx="2.5" fill="currentColor" fill-opacity=".25"></rect><rect x="2.5" y="4.5" width="19" height="13" rx="2.5"></rect><path d="M8 21h8M12 17.5V21"></path>',
  'e-wallet':
    '<path d="M3.5 7.5h16a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5h-14A2 2 0 0 1 3.5 18.5z" fill="currentColor" fill-opacity=".25"></path><path d="M3.5 7.5h16a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5h-14A2 2 0 0 1 3.5 18.5V6A2.5 2.5 0 0 1 6 3.5h11v4"></path><path d="M21 12h-4a2 2 0 0 0 0 4h4"></path>',
  multifinance:
    '<path d="M3 9.5 12 3.5l9 6z" fill="currentColor" fill-opacity=".25"></path><path d="M3 9.5 12 3.5l9 6zM5.5 10v7.5M10 10v7.5M14 10v7.5M18.5 10v7.5M3 20.5h18"></path>',
};

const CATEGORY_LINKS = [
  ['pulsa', 'Pulsa'],
  ['paket-data', 'Paket Data'],
  ['pln', 'PLN'],
  ['pdam', 'PDAM'],
  ['bpjs', 'BPJS'],
  ['internet-tv', 'Internet & TV'],
  ['e-wallet', 'E-Wallet'],
  ['multifinance', 'Multifinance'],
];

export default function HomePage() {
  return (
    <>
      <section className="pbn-sec pbn-hero" aria-label="Promo spesial">
        <div className="wrap">
          <h1 className="sr-only">
            Promo Spesial: Cashback hingga 30% untuk transaksi pulsa, paket data, PLN,
            e-wallet, dan pembayaran lainnya
          </h1>
          <Link className="bimg" href="/promo">
            <img
              className="bi-d"
              src="/images/d670345a-2786-4323-8ca8-bfd6e337b226.png"
              width="1983"
              height="793"
              alt="Promo Spesial: Cashback hingga 30% untuk Pulsa, Paket Data, PLN, PDAM, BPJS, Internet, Uang Elektronik, Multifinance"
            />
            <img
              className="bi-m"
              src="/images/fae2669d-151a-46d7-8481-033ac224ce4f.png"
              width="1122"
              height="1402"
              alt="Promo Spesial: Cashback hingga 30% untuk Pulsa, Paket Data, PLN, PDAM, BPJS, Internet, Uang Elektronik, Multifinance"
            />
          </Link>
          <div className="bm">
            <p className="bm-s">
              Untuk transaksi pulsa, paket data, PLN, e-wallet, dan pembayaran lainnya.
            </p>
            <Link className="bm-c" href="/promo">
              Lihat Promo →
            </Link>
          </div>
          <p className="bnote">
            *Syarat &amp; ketentuan berlaku. Cek detail di halaman Promo.
          </p>
          <nav className="kts" aria-label="Kategori">
            <h2 className="kts-h">Kategori</h2>
            <div className="kt-g">
              {CATEGORY_LINKS.map(([key, label]) => (
                <PpobLink
                  key={key}
                  href={'/#cat=' + key}
                  params={{ cat: key }}
                  className="kt"
                >
                  <span className="kt-i">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      dangerouslySetInnerHTML={{ __html: CATEGORY_ICONS[key] }}
                    />
                  </span>
                  <span className="kt-l">{label}</span>
                </PpobLink>
              ))}
            </div>
          </nav>
        </div>
      </section>

      <PpobSheet />

      <section className="asec">
        <div className="awrap">
          <div className="ashd">
            <div>
              <div className="aeye">
                <i />
                Produk Pilihan
              </div>
              <h2>Paling sering dibeli.</h2>
            </div>
            <PpobLink className="alink" href="/#ppob">
              Lihat semua <span>→</span>
            </PpobLink>
          </div>
          <HomeProducts />
        </div>
      </section>

      <section className="asec">
        <div className="awrap">
          <div className="ashd">
            <div>
              <div className="aeye">
                <i />
                Promo
              </div>
              <h2>Promo yang sedang berlangsung.</h2>
            </div>
            <Link className="alink" href="/promo">
              Lihat semua <span>→</span>
            </Link>
          </div>
          <div className="pr-grid">
            <article className="pr-card pr-feat">
              <div className="pr-top">
                <span className="pr-tag">Token PLN</span>
                <span className="pr-code">TERANG</span>
              </div>
              <div className="pr-val">Cashback 10%</div>
              <p>Maks. Rp15.000 untuk token min. Rp100rb</p>
              <PpobLink className="pr-cta" href="/#cat=pln" params={{ cat: 'pln' }}>
                Beli Token PLN <span>→</span>
              </PpobLink>
            </article>
            <article className="pr-card">
              <div className="pr-top">
                <span className="pr-tag">Paket Data</span>
              </div>
              <div className="pr-val">
                Kuota Ekstra <em>+5GB</em>
              </div>
              <p>Paket data Telkomsel &amp; XL pilihan.</p>
              <PpobLink
                className="pr-cta"
                href="/#cat=paket-data"
                params={{ cat: 'paket-data' }}
              >
                Lihat paket <span>→</span>
              </PpobLink>
            </article>
            <article className="pr-card">
              <div className="pr-top">
                <span className="pr-tag">Pengguna baru</span>
              </div>
              <div className="pr-val">Rp5.000</div>
              <p>Diskon transaksi pertama</p>
              <div className="pr-cpn">
                <span>BARU5</span>
                <CopyButton code="BARU5" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="asec">
        <div className="awrap">
          <div className="ashd">
            <div>
              <div className="aeye">
                <i />
                Cara Kerja
              </div>
              <h2>Empat langkah, selesai.</h2>
            </div>
            <Link className="alink" href="/panduan-pembayaran">
              Panduan <span>→</span>
            </Link>
          </div>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <b>Pilih Produk</b>
                <p>Cari kategori atau provider yang kamu butuhkan.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <b>Masukkan Data</b>
                <p>Nomor HP, ID pelanggan, atau nomor akun tujuan.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <b>Bayar dengan QRIS</b>
                <p>Scan dari aplikasi mobile banking atau e-wallet.</p>
              </div>
            </li>
            <li className="last">
              <span>04</span>
              <div>
                <b>Transaksi Selesai</b>
                <p>Produk diproses otomatis, cek status kapan saja.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="asec">
        <div className="awrap faqwrap">
          <div>
            <div className="aeye">
              <i />
              FAQ
            </div>
            <h2>Pertanyaan Umum</h2>
            <p>Belum menemukan jawaban? Lihat semua FAQ atau hubungi CS kami.</p>
            <div className="abtns">
              <Link className="abtn abtn-p" href="/faq">
                Lihat semua FAQ
              </Link>
              <a className="abtn abtn-o" href={wa(WA_DEFAULT)} target="_blank" rel="noopener">
                WhatsApp CS
              </a>
            </div>
          </div>
          <div className="afq-list">
            <Faq q="Berapa lama pesanan diproses?" defaultOpen>
              Sebagian besar produk diproses otomatis dalam beberapa menit setelah
              pembayaran terkonfirmasi.
            </Faq>
            <Faq q="Metode pembayaran apa saja yang tersedia?">
              Saat ini pembayaran menggunakan QRIS, yang bisa dibayar lewat aplikasi mobile
              banking atau e-wallet.
            </Faq>
            <Faq q="Bagaimana cara cek status pesanan?">
              Buka halaman Cek Pesanan dan masukkan nomor invoice kamu.
            </Faq>
            <Faq q="Salah memasukkan nomor tujuan, bagaimana?">
              Segera hubungi WhatsApp CS dengan menyertakan nomor invoice agar bisa kami
              bantu cek.
            </Faq>
          </div>
        </div>
      </section>
    </>
  );
}
