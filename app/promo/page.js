import CopyButton from '@/components/CopyButton';
import PpobLink from '@/components/PpobLink';

export const metadata = { title: 'Promo & Penawaran' };

export default function PromoPage() {
  return (
    <>
      <section className="aph">
        <div className="awrap">
          <div className="aeye">
            <i />
            Promo
          </div>
          <h1>Promo &amp; Penawaran</h1>
          <p>Temukan promo digital yang sedang berlangsung.</p>
        </div>
      </section>

      <section className="awrap asec-tight">
        <div className="pp2-grid">
          <article className="pp2 feat">
            <div className="pr-top">
              <span className="pr-tag">Token PLN</span>
              <span className="pr-code">TERANG</span>
            </div>
            <h2>Cashback 10% Token PLN</h2>
            <p>
              Cashback hingga Rp15.000 untuk pembelian token listrik minimal Rp100.000.
            </p>
            <div className="pp2-foot">
              <small>Berlaku hingga 31 Oktober 2026</small>
              <PpobLink className="abtn abtn-g" href="/#cat=pln" params={{ cat: 'pln' }}>
                Beli Token PLN
              </PpobLink>
            </div>
          </article>

          <article className="pp2">
            <div className="pr-top">
              <span className="pr-tag">Paket Data</span>
            </div>
            <h2>Kuota Ekstra +5GB</h2>
            <p>Bonus kuota untuk paket data Telkomsel dan XL pilihan.</p>
            <div className="pp2-foot">
              <small>Berlaku hingga 31 Oktober 2026</small>
              <PpobLink
                className="abtn abtn-p"
                href="/#cat=paket-data"
                params={{ cat: 'paket-data' }}
              >
                Lihat Paket Data
              </PpobLink>
            </div>
          </article>

          <article className="pp2">
            <div className="pr-top">
              <span className="pr-tag">Pengguna Baru</span>
              <span className="pr-code">BARU5</span>
            </div>
            <h2>Diskon Rp5.000</h2>
            <p>Potongan untuk transaksi pertama kamu di Avenzio Seven.</p>
            <div className="pp2-foot">
              <small>Berlaku hingga 31 Desember 2026</small>
              <div className="abtns" style={{ margin: 0 }}>
                <CopyButton className="abtn abtn-p" code="BARU5" />
              </div>
            </div>
          </article>

          <article className="pp2">
            <div className="pr-top">
              <span className="pr-tag">E-Wallet</span>
            </div>
            <h2>Isi Saldo Tanpa Biaya Tambahan</h2>
            <p>Top up DANA, OVO, GoPay, dan ShopeePay tanpa biaya layanan.</p>
            <div className="pp2-foot">
              <small>Berlaku hingga 31 Oktober 2026</small>
              <PpobLink
                className="abtn abtn-p"
                href="/#cat=e-wallet"
                params={{ cat: 'e-wallet' }}
              >
                Isi Saldo
              </PpobLink>
            </div>
          </article>
        </div>
        <p className="ahint pp2-note">
          Syarat dan ketentuan berlaku. Kode promo dimasukkan saat checkout.
        </p>
      </section>
    </>
  );
}
