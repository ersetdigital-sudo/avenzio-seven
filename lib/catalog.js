// AUTO-GENERATED from the legacy `window.AV` global (assets/app.js).
// Avenzio Seven product catalog — single source of truth for the app.

export const PROVS = {
  "tsel": [
    "Telkomsel",
    "TSEL",
    "#3D0B37",
    "#fff"
  ],
  "xl": [
    "XL Axiata",
    "XL",
    "#FFD000",
    "#3D0B37"
  ],
  "isat": [
    "Indosat IM3",
    "IM3",
    "#241724",
    "#fff"
  ],
  "tri": [
    "Tri",
    "3",
    "#FAF8F4",
    "#3D0B37"
  ],
  "smart": [
    "Smartfren",
    "SF",
    "#3D0B37",
    "#FFD000"
  ],
  "axis": [
    "AXIS",
    "AX",
    "#FAF8F4",
    "#3D0B37"
  ],
  "pln": [
    "PLN",
    "PLN",
    "#FFD000",
    "#3D0B37"
  ],
  "dana": [
    "DANA",
    "DANA",
    "#FAF8F4",
    "#3D0B37"
  ],
  "ovo": [
    "OVO",
    "OVO",
    "#3D0B37",
    "#fff"
  ],
  "gopay": [
    "GoPay",
    "GO",
    "#241724",
    "#FFD000"
  ],
  "spay": [
    "ShopeePay",
    "SP",
    "#FAF8F4",
    "#3D0B37"
  ],
  "ihome": [
    "IndiHome",
    "IH",
    "#3D0B37",
    "#fff"
  ],
  "bfirst": [
    "First Media",
    "FM",
    "#FAF8F4",
    "#3D0B37"
  ],
  "bpjs": [
    "BPJS Kesehatan",
    "BPJS",
    "#FAF8F4",
    "#3D0B37"
  ],
  "pdam": [
    "PDAM",
    "PDAM",
    "#FAF8F4",
    "#3D0B37"
  ],
  "fif": [
    "FIFGROUP",
    "FIF",
    "#3D0B37",
    "#FFD000"
  ],
  "adira": [
    "Adira Finance",
    "ADR",
    "#FFD000",
    "#3D0B37"
  ]
};

export const CATS = {
  "pulsa": "Pulsa",
  "paket-data": "Paket Data",
  "pln": "PLN",
  "e-wallet": "E-Wallet",
  "internet-tv": "Internet & TV",
  "bpjs": "BPJS",
  "pdam": "PDAM",
  "multifinance": "Multifinance"
};

/** Per-category input config: [label, placeholder, regex, hint, eta] */
export const FIELDS = {
  "pulsa": [
    "Nomor Tujuan",
    "08xxxxxxxxxx",
    "^08[0-9]{8,11}$",
    "Nomor HP aktif, 10–13 digit diawali 08.",
    "1–3 menit"
  ],
  "paket-data": [
    "Nomor Tujuan",
    "08xxxxxxxxxx",
    "^08[0-9]{8,11}$",
    "Nomor HP aktif, 10–13 digit diawali 08.",
    "1–3 menit"
  ],
  "pln": [
    "Nomor Meter / ID Pelanggan",
    "Contoh: 12345678901",
    "^[0-9]{11,12}$",
    "11–12 digit, tertera di meteran atau struk PLN.",
    "1–5 menit"
  ],
  "e-wallet": [
    "Nomor HP Terdaftar",
    "08xxxxxxxxxx",
    "^08[0-9]{8,11}$",
    "Nomor HP yang terdaftar di akun e-wallet.",
    "1–3 menit"
  ],
  "internet-tv": [
    "ID Pelanggan",
    "Contoh: 1234567890",
    "^[0-9]{8,13}$",
    "8–13 digit, tertera di tagihan bulanan.",
    "1–10 menit"
  ],
  "bpjs": [
    "Nomor VA Keluarga",
    "Contoh: 8888801234567890",
    "^[0-9]{11,16}$",
    "Nomor Virtual Account di kartu BPJS.",
    "1–10 menit"
  ],
  "pdam": [
    "ID Pelanggan",
    "Contoh: 0123456789",
    "^[0-9]{5,15}$",
    "Nomor pelanggan di rekening air.",
    "1–10 menit"
  ],
  "multifinance": [
    "Nomor Kontrak",
    "Contoh: 1234567890",
    "^[0-9]{6,16}$",
    "Nomor kontrak pembiayaan kamu.",
    "1–10 menit"
  ]
};

export const PRODUCTS = [
  {"slug":"telkomsel-pulsa-25000","cat":"pulsa","prov":"tsel","provName":"Telkomsel","title":"Pulsa Telkomsel 25.000","short":"Telkomsel 25.000","nominal":"25.000","price":26500,"bill":false,"desc":"Pulsa reguler Telkomsel dengan proses transaksi cepat.","kind":"Pulsa"},
  {"slug":"telkomsel-pulsa-50000","cat":"pulsa","prov":"tsel","provName":"Telkomsel","title":"Pulsa Telkomsel 50.000","short":"Telkomsel 50.000","nominal":"50.000","price":50900,"bill":false,"desc":"Pulsa reguler Telkomsel dengan proses transaksi cepat.","kind":"Pulsa"},
  {"slug":"telkomsel-pulsa-100000","cat":"pulsa","prov":"tsel","provName":"Telkomsel","title":"Pulsa Telkomsel 100.000","short":"Telkomsel 100.000","nominal":"100.000","price":99500,"bill":false,"desc":"Pulsa reguler Telkomsel dengan proses transaksi cepat.","kind":"Pulsa"},
  {"slug":"xl-pulsa-25000","cat":"pulsa","prov":"xl","provName":"XL Axiata","title":"Pulsa XL Axiata 25.000","short":"XL Axiata 25.000","nominal":"25.000","price":25700,"bill":false,"desc":"Pulsa reguler XL Axiata dengan proses transaksi cepat.","kind":"Pulsa"},
  {"slug":"xl-pulsa-50000","cat":"pulsa","prov":"xl","provName":"XL Axiata","title":"Pulsa XL Axiata 50.000","short":"XL Axiata 50.000","nominal":"50.000","price":50300,"bill":false,"desc":"Pulsa reguler XL Axiata dengan proses transaksi cepat.","kind":"Pulsa"},
  {"slug":"xl-pulsa-100000","cat":"pulsa","prov":"xl","provName":"XL Axiata","title":"Pulsa XL Axiata 100.000","short":"XL Axiata 100.000","nominal":"100.000","price":99200,"bill":false,"desc":"Pulsa reguler XL Axiata dengan proses transaksi cepat.","kind":"Pulsa"},
  {"slug":"indosat-pulsa-25000","cat":"pulsa","prov":"isat","provName":"Indosat IM3","title":"Pulsa Indosat IM3 25.000","short":"Indosat IM3 25.000","nominal":"25.000","price":25400,"bill":false,"desc":"Pulsa reguler Indosat IM3 dengan proses transaksi cepat.","kind":"Pulsa"},
  {"slug":"indosat-pulsa-50000","cat":"pulsa","prov":"isat","provName":"Indosat IM3","title":"Pulsa Indosat IM3 50.000","short":"Indosat IM3 50.000","nominal":"50.000","price":50200,"bill":false,"desc":"Pulsa reguler Indosat IM3 dengan proses transaksi cepat.","kind":"Pulsa"},
  {"slug":"tri-pulsa-20000","cat":"pulsa","prov":"tri","provName":"Tri","title":"Pulsa Tri 20.000","short":"Tri 20.000","nominal":"20.000","price":20600,"bill":false,"desc":"Pulsa reguler Tri dengan proses transaksi cepat.","kind":"Pulsa"},
  {"slug":"tri-pulsa-50000","cat":"pulsa","prov":"tri","provName":"Tri","title":"Pulsa Tri 50.000","short":"Tri 50.000","nominal":"50.000","price":49800,"bill":false,"desc":"Pulsa reguler Tri dengan proses transaksi cepat.","kind":"Pulsa"},
  {"slug":"smartfren-pulsa-25000","cat":"pulsa","prov":"smart","provName":"Smartfren","title":"Pulsa Smartfren 25.000","short":"Smartfren 25.000","nominal":"25.000","price":25300,"bill":false,"desc":"Pulsa reguler Smartfren dengan proses transaksi cepat.","kind":"Pulsa"},
  {"slug":"axis-pulsa-25000","cat":"pulsa","prov":"axis","provName":"AXIS","title":"Pulsa AXIS 25.000","short":"AXIS 25.000","nominal":"25.000","price":25500,"bill":false,"desc":"Pulsa reguler AXIS dengan proses transaksi cepat.","kind":"Pulsa"},
  {"slug":"telkomsel-data-12-gb","cat":"paket-data","prov":"tsel","provName":"Telkomsel","title":"Paket Data Telkomsel 12 GB","short":"Telkomsel 12 GB","nominal":"12 GB","price":62000,"bill":false,"desc":"Paket data Telkomsel 12 GB, aktif setelah transaksi berhasil.","kind":"Paket Data"},
  {"slug":"telkomsel-data-30-gb","cat":"paket-data","prov":"tsel","provName":"Telkomsel","title":"Paket Data Telkomsel 30 GB","short":"Telkomsel 30 GB","nominal":"30 GB","price":115000,"bill":false,"desc":"Paket data Telkomsel 30 GB, aktif setelah transaksi berhasil.","kind":"Paket Data"},
  {"slug":"xl-data-xtra-combo-25-gb","cat":"paket-data","prov":"xl","provName":"XL Axiata","title":"Paket Data XL Axiata Xtra Combo 25 GB","short":"XL Axiata Xtra Combo 25 GB","nominal":"Xtra Combo 25 GB","price":89000,"bill":false,"desc":"Paket data XL Axiata Xtra Combo 25 GB, aktif setelah transaksi berhasil.","kind":"Paket Data"},
  {"slug":"indosat-data-freedom-15-gb","cat":"paket-data","prov":"isat","provName":"Indosat IM3","title":"Paket Data Indosat IM3 Freedom 15 GB","short":"Indosat IM3 Freedom 15 GB","nominal":"Freedom 15 GB","price":55000,"bill":false,"desc":"Paket data Indosat IM3 Freedom 15 GB, aktif setelah transaksi berhasil.","kind":"Paket Data"},
  {"slug":"tri-data-happy-32-gb","cat":"paket-data","prov":"tri","provName":"Tri","title":"Paket Data Tri Happy 32 GB","short":"Tri Happy 32 GB","nominal":"Happy 32 GB","price":95000,"bill":false,"desc":"Paket data Tri Happy 32 GB, aktif setelah transaksi berhasil.","kind":"Paket Data"},
  {"slug":"axis-data-bronet-10-gb","cat":"paket-data","prov":"axis","provName":"AXIS","title":"Paket Data AXIS Bronet 10 GB","short":"AXIS Bronet 10 GB","nominal":"Bronet 10 GB","price":45000,"bill":false,"desc":"Paket data AXIS Bronet 10 GB, aktif setelah transaksi berhasil.","kind":"Paket Data"},
  {"slug":"token-pln-20000","cat":"pln","prov":"pln","provName":"PLN","title":"Token Listrik PLN 20.000","short":"PLN 20.000","nominal":"20.000","price":21500,"bill":false,"desc":"Token listrik prabayar PLN, kode token dikirim setelah transaksi berhasil.","kind":"Token Listrik"},
  {"slug":"token-pln-50000","cat":"pln","prov":"pln","provName":"PLN","title":"Token Listrik PLN 50.000","short":"PLN 50.000","nominal":"50.000","price":51500,"bill":false,"desc":"Token listrik prabayar PLN, kode token dikirim setelah transaksi berhasil.","kind":"Token Listrik"},
  {"slug":"token-pln-100000","cat":"pln","prov":"pln","provName":"PLN","title":"Token Listrik PLN 100.000","short":"PLN 100.000","nominal":"100.000","price":101500,"bill":false,"desc":"Token listrik prabayar PLN, kode token dikirim setelah transaksi berhasil.","kind":"Token Listrik"},
  {"slug":"token-pln-200000","cat":"pln","prov":"pln","provName":"PLN","title":"Token Listrik PLN 200.000","short":"PLN 200.000","nominal":"200.000","price":201500,"bill":false,"desc":"Token listrik prabayar PLN, kode token dikirim setelah transaksi berhasil.","kind":"Token Listrik"},
  {"slug":"dana-saldo-50000","cat":"e-wallet","prov":"dana","provName":"DANA","title":"Saldo DANA 50.000","short":"DANA 50.000","nominal":"50.000","price":51000,"bill":false,"desc":"Isi saldo DANA langsung ke akun terdaftar.","kind":"Saldo"},
  {"slug":"dana-saldo-100000","cat":"e-wallet","prov":"dana","provName":"DANA","title":"Saldo DANA 100.000","short":"DANA 100.000","nominal":"100.000","price":101000,"bill":false,"desc":"Isi saldo DANA langsung ke akun terdaftar.","kind":"Saldo"},
  {"slug":"ovo-saldo-50000","cat":"e-wallet","prov":"ovo","provName":"OVO","title":"Saldo OVO 50.000","short":"OVO 50.000","nominal":"50.000","price":51000,"bill":false,"desc":"Isi saldo OVO langsung ke akun terdaftar.","kind":"Saldo"},
  {"slug":"ovo-saldo-100000","cat":"e-wallet","prov":"ovo","provName":"OVO","title":"Saldo OVO 100.000","short":"OVO 100.000","nominal":"100.000","price":101000,"bill":false,"desc":"Isi saldo OVO langsung ke akun terdaftar.","kind":"Saldo"},
  {"slug":"gopay-saldo-50000","cat":"e-wallet","prov":"gopay","provName":"GoPay","title":"Saldo GoPay 50.000","short":"GoPay 50.000","nominal":"50.000","price":51000,"bill":false,"desc":"Isi saldo GoPay langsung ke akun terdaftar.","kind":"Saldo"},
  {"slug":"gopay-saldo-100000","cat":"e-wallet","prov":"gopay","provName":"GoPay","title":"Saldo GoPay 100.000","short":"GoPay 100.000","nominal":"100.000","price":101000,"bill":false,"desc":"Isi saldo GoPay langsung ke akun terdaftar.","kind":"Saldo"},
  {"slug":"shopeepay-saldo-50000","cat":"e-wallet","prov":"spay","provName":"ShopeePay","title":"Saldo ShopeePay 50.000","short":"ShopeePay 50.000","nominal":"50.000","price":51000,"bill":false,"desc":"Isi saldo ShopeePay langsung ke akun terdaftar.","kind":"Saldo"},
  {"slug":"shopeepay-saldo-100000","cat":"e-wallet","prov":"spay","provName":"ShopeePay","title":"Saldo ShopeePay 100.000","short":"ShopeePay 100.000","nominal":"100.000","price":101000,"bill":false,"desc":"Isi saldo ShopeePay langsung ke akun terdaftar.","kind":"Saldo"},
  {"slug":"tagihan-indihome","cat":"internet-tv","prov":"ihome","provName":"IndiHome","title":"Tagihan IndiHome","short":"Tagihan IndiHome","nominal":"Sesuai tagihan","price":2500,"bill":true,"desc":"Pembayaran tagihan IndiHome. Harga yang tertera adalah biaya admin; jumlah tagihan ditambahkan setelah ID dicek.","kind":"Internet & TV"},
  {"slug":"tagihan-first-media","cat":"internet-tv","prov":"bfirst","provName":"First Media","title":"Tagihan First Media","short":"Tagihan First Media","nominal":"Sesuai tagihan","price":2500,"bill":true,"desc":"Pembayaran tagihan First Media. Harga yang tertera adalah biaya admin; jumlah tagihan ditambahkan setelah ID dicek.","kind":"Internet & TV"},
  {"slug":"iuran-bpjs-kesehatan","cat":"bpjs","prov":"bpjs","provName":"BPJS Kesehatan","title":"Iuran BPJS Kesehatan","short":"Iuran BPJS Kesehatan","nominal":"Sesuai tagihan","price":2500,"bill":true,"desc":"Pembayaran iuran BPJS Kesehatan. Harga yang tertera adalah biaya admin; jumlah iuran ditambahkan setelah nomor VA dicek.","kind":"BPJS"},
  {"slug":"tagihan-pdam","cat":"pdam","prov":"pdam","provName":"PDAM","title":"Tagihan PDAM","short":"Tagihan PDAM","nominal":"Sesuai tagihan","price":2500,"bill":true,"desc":"Pembayaran tagihan air PDAM. Harga yang tertera adalah biaya admin; jumlah tagihan ditambahkan setelah ID dicek.","kind":"PDAM"},
  {"slug":"angsuran-fifgroup","cat":"multifinance","prov":"fif","provName":"FIFGROUP","title":"Angsuran FIFGROUP","short":"Angsuran FIFGROUP","nominal":"Sesuai tagihan","price":3000,"bill":true,"desc":"Pembayaran angsuran FIFGROUP. Harga yang tertera adalah biaya admin; jumlah angsuran ditambahkan setelah nomor kontrak dicek.","kind":"Multifinance"},
  {"slug":"angsuran-adira","cat":"multifinance","prov":"adira","provName":"Adira Finance","title":"Angsuran Adira Finance","short":"Angsuran Adira Finance","nominal":"Sesuai tagihan","price":3000,"bill":true,"desc":"Pembayaran angsuran Adira Finance. Harga yang tertera adalah biaya admin; jumlah angsuran ditambahkan setelah nomor kontrak dicek.","kind":"Multifinance"}
];

export const AV = { products: PRODUCTS, provs: PROVS, cats: CATS, fields: FIELDS };

export const BY_SLUG = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));

export const CATS_WITH_PRODUCTS = Object.keys(CATS).filter((c) =>
  PRODUCTS.some((p) => p.cat === c)
);

/** Categories where the destination is a phone number (operator auto-detected). */
export const PHONE_CATS = { pulsa: 1, 'paket-data': 1 };

export const PHONE_PREFIX = {
  tsel: ['0811', '0812', '0813', '0821', '0822', '0823', '0851', '0852', '0853'],
  isat: ['0814', '0815', '0816', '0855', '0856', '0857', '0858'],
  xl: ['0817', '0818', '0819', '0859', '0877', '0878'],
  axis: ['0831', '0832', '0833', '0838'],
  tri: ['0895', '0896', '0897', '0898', '0899'],
  smart: ['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'],
};

export default AV;
