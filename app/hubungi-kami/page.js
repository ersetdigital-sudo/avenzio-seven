import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { WA_DEFAULT, wa } from '@/lib/site';

export const metadata = { title: 'Hubungi Kami' };

export default function HubungiKamiPage() {
  return (
    <>
      <section className="aph">
        <div className="awrap">
          <div className="aeye">
            <i />
            Bantuan
          </div>
          <h1>Hubungi Kami</h1>
          <p>Butuh bantuan? Tim Avenzio Seven siap membantu.</p>
        </div>
      </section>

      <section className="awrap kon">
        <div className="kon-cards">
          <div className="abox kon-c kon-wa">
            <span className="kon-ic">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.4A9 9 0 1 1 21 12Z" />
              </svg>
            </span>
            <div className="aeye">WhatsApp CS</div>
            <h2>Chat dengan tim kami</h2>
            <p>Respons cepat untuk pertanyaan seputar pesanan dan pembayaran.</p>
            <a className="abtn abtn-g abtn-lg" href={wa(WA_DEFAULT)} target="_blank" rel="noopener">
              Chat WhatsApp
            </a>
          </div>

          <div className="abox kon-c">
            <span className="kon-ic kon-ic2">
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>
            <div className="aeye">Operasional</div>
            <h2>
              Senin – Minggu
              <br />
              09.00 – 21.00 WIB
            </h2>
            <p>Pesan di luar jam operasional dibalas pada jam kerja berikutnya.</p>
          </div>

          <div className="abox kon-links">
            <h3>Pertanyaan Umum</h3>
            <Link href="/panduan-pembayaran">
              Panduan Pembayaran<span>→</span>
            </Link>
            <Link href="/cek-pesanan">
              Cek Pesanan<span>→</span>
            </Link>
            <Link href="/faq">
              FAQ<span>→</span>
            </Link>
          </div>
        </div>

        <ContactForm />
      </section>
    </>
  );
}
