import Link from 'next/link';
import { WA_DEFAULT, wa } from '@/lib/site';
import Brand from './Brand';
import PpobLink from './PpobLink';

export default function SiteFooter() {
  return (
    <footer className="aft">
      <div className="awrap">
        <div className="aft-grid">
          <div>
            <Brand dark />
            <p className="aft-tag">
              Marketplace kebutuhan digital yang praktis dan terpercaya.
            </p>
          </div>
          <div>
            <h4>Navigasi</h4>
            <Link href="/">Home</Link>
            <PpobLink href="/#ppob">Beli</PpobLink>
            <Link href="/promo">Promo</Link>
            <Link href="/cek-pesanan">Cek Pesanan</Link>
          </div>
          <div>
            <h4>Bantuan</h4>
            <Link href="/faq">FAQ</Link>
            <Link href="/panduan-pembayaran">Panduan Pembayaran</Link>
            <Link href="/hubungi-kami">Hubungi Kami</Link>
          </div>
          <div>
            <h4>Kontak</h4>
            <a href={wa(WA_DEFAULT)} target="_blank" rel="noopener">
              WhatsApp CS
            </a>
            <p>
              Jam Operasional
              <br />
              <span>Senin – Minggu, 09.00 – 21.00 WIB</span>
            </p>
          </div>
        </div>
        <div className="aft-bot">
          <span>© 2026 Avenzio Seven. All rights reserved.</span>
          <span>Pembayaran aman via QRIS</span>
        </div>
      </div>
    </footer>
  );
}
