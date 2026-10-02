import './styles/fonts.css';
import './styles/theme.css';
import './styles/app.css';
import './styles/product.css';
import './styles/buysheet.css';

import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  applicationName: 'Avenzio Seven',
  description:
    'Avenzio Seven, marketplace kebutuhan digital: pulsa, paket data, token PLN, e-wallet, dan tagihan. Bayar dengan QRIS.',
  title: {
    default: 'Avenzio Seven — Marketplace Kebutuhan Digital',
    template: '%s — Avenzio Seven',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <BottomNav />
      </body>
    </html>
  );
}
