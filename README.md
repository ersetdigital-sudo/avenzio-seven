# Avenzio Seven — Next.js

Marketplace kebutuhan digital (pulsa, paket data, token PLN, e-wallet, tagihan)
yang dikonversi dari website statis HTML/CSS/JS ke **Next.js 16 (App Router)**.

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build produksi
npm start       # jalankan build produksi
```

## Struktur proyek

```
app/                     Rute App Router (layout, page, metadata, favicon)
  page.js                Beranda: hero, kategori, produk, promo, langkah, FAQ
  produk/[slug]/page.js  Detail produk (SSG untuk 36 produk)
  promo/ faq/ hubungi-kami/ panduan-pembayaran/
  cek-pesanan/ pembayaran/ checkout/sukses/
  checkout/ katalog/ zz-co/ zz-pay/   Aliasan redirect (warisan situs lama)
  styles/                fonts.css, theme.css, app.css
components/              Komponen UI + Client Component untuk interaksi
lib/                     Data katalog, formatter, storage, order, QR, bus PPOB
public/                  Font (TTF), gambar promo, ikon
legacy/                  Situs statis lama — arsip referensi, TIDAK ikut build
```

### Modul `lib/`

| File | Fungsi |
| --- | --- |
| `catalog.js` | Sumber data tunggal: 36 produk, provider, kategori, aturan input |
| `site.js` | Navigasi, ikon drawer, helper link WhatsApp |
| `format.js` | `rp()`, `dt()`, `digits()` |
| `storage.js` | localStorage/sessionStorage dengan fallback aman |
| `orders.js` | Simpan/paca pesanan, nomor invoice |
| `qr.js` | Generator gambar QRIS pratinjau (visual saja) |
| `ppobBus.js` | Membuka bottom sheet PPOB dari link mana pun |

### Alur transaksi

1. **Beranda** → `PpobSheet` (bottom sheet) muncul saat hash `#ppob`, `#cat=…`, atau `#p=…`.
2. **Halaman produk** → form nomor tujuan, tombol *Bayar Sekarang* memasang `PpobForm`
   secara inline (mode `pay`) sehingga langsung ke layar QRIS.
3. **Layar QRIS** (`PpobPayScreen`) → timer 15 menit, status tersimpan di `localStorage`.
4. **`/pembayaran`** → halaman pembayaran dengan tombol *Simulasi status* (mode uji).
5. **`/checkout/sukses`** dan **`/cek-pesanan`** → menampilkan ringkasan transaksi.

## Catatan & asumsi penting

- **`legacy/` adalah situs statis asli** (HTML, CSS, JS). Ia tidak ikut dibangun oleh
  Next.js; folder `pages/` lama sengaja dipindahkan ke sana agar tidak bertabrakan
  dengan folder `pages/` milik Next.js.
- **Desain 1:1 dipertahankan.** `app/styles/app.css` dan `theme.css` disalin apa adanya,
  begitu juga font Plus Jakarta Sans TTF (kini di-bundle lewat `/fonts`, jadi tidak lagi
  bergantung pada Google Fonts).
- **Tailwind CDN dihapus.** Dicek terhadap seluruh halaman lama: tidak ada satu pun
  utility class Tailwind yang dipakai — CDN itu hanya dipakai oleh `main.js` yang sudah
  mati (menargetkan elemen `#footer` yang tidak ada).
- **`WA_NUMBER` masih kosong.** Isi nomor WhatsApp CS dengan format `628xxxxxxxxxx` di
  `lib/site.js`.
- **Belum ada backend.** Pesanan disimpan di browser (`localStorage`) dan QRIS hanyalah
  pratinjau visual sampai gateway pembayaran dihubungkan — sama seperti versi lama.
