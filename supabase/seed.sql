-- Seed: 36 produk dari lib/catalog.js + metode pembayaran awal
delete from public.products;
insert into public.products (slug,cat,prov,prov_name,title,short,nominal,price,bill,description,kind,featured,sort_order) values
  ('telkomsel-pulsa-25000','pulsa','tsel','Telkomsel','Pulsa Telkomsel 25.000','Telkomsel 25.000','25.000',26500,false,'Pulsa reguler Telkomsel dengan proses transaksi cepat.','Pulsa',true,0),
  ('telkomsel-pulsa-50000','pulsa','tsel','Telkomsel','Pulsa Telkomsel 50.000','Telkomsel 50.000','50.000',50900,false,'Pulsa reguler Telkomsel dengan proses transaksi cepat.','Pulsa',false,1),
  ('telkomsel-pulsa-100000','pulsa','tsel','Telkomsel','Pulsa Telkomsel 100.000','Telkomsel 100.000','100.000',99500,false,'Pulsa reguler Telkomsel dengan proses transaksi cepat.','Pulsa',false,2),
  ('xl-pulsa-25000','pulsa','xl','XL Axiata','Pulsa XL Axiata 25.000','XL Axiata 25.000','25.000',25700,false,'Pulsa reguler XL Axiata dengan proses transaksi cepat.','Pulsa',true,3),
  ('xl-pulsa-50000','pulsa','xl','XL Axiata','Pulsa XL Axiata 50.000','XL Axiata 50.000','50.000',50300,false,'Pulsa reguler XL Axiata dengan proses transaksi cepat.','Pulsa',false,4),
  ('xl-pulsa-100000','pulsa','xl','XL Axiata','Pulsa XL Axiata 100.000','XL Axiata 100.000','100.000',99200,false,'Pulsa reguler XL Axiata dengan proses transaksi cepat.','Pulsa',false,5),
  ('indosat-pulsa-25000','pulsa','isat','Indosat IM3','Pulsa Indosat IM3 25.000','Indosat IM3 25.000','25.000',25400,false,'Pulsa reguler Indosat IM3 dengan proses transaksi cepat.','Pulsa',false,6),
  ('indosat-pulsa-50000','pulsa','isat','Indosat IM3','Pulsa Indosat IM3 50.000','Indosat IM3 50.000','50.000',50200,false,'Pulsa reguler Indosat IM3 dengan proses transaksi cepat.','Pulsa',false,7),
  ('tri-pulsa-20000','pulsa','tri','Tri','Pulsa Tri 20.000','Tri 20.000','20.000',20600,false,'Pulsa reguler Tri dengan proses transaksi cepat.','Pulsa',false,8),
  ('tri-pulsa-50000','pulsa','tri','Tri','Pulsa Tri 50.000','Tri 50.000','50.000',49800,false,'Pulsa reguler Tri dengan proses transaksi cepat.','Pulsa',false,9),
  ('smartfren-pulsa-25000','pulsa','smart','Smartfren','Pulsa Smartfren 25.000','Smartfren 25.000','25.000',25300,false,'Pulsa reguler Smartfren dengan proses transaksi cepat.','Pulsa',false,10),
  ('axis-pulsa-25000','pulsa','axis','AXIS','Pulsa AXIS 25.000','AXIS 25.000','25.000',25500,false,'Pulsa reguler AXIS dengan proses transaksi cepat.','Pulsa',false,11),
  ('telkomsel-data-12-gb','paket-data','tsel','Telkomsel','Paket Data Telkomsel 12 GB','Telkomsel 12 GB','12 GB',62000,false,'Paket data Telkomsel 12 GB, aktif setelah transaksi berhasil.','Paket Data',false,12),
  ('telkomsel-data-30-gb','paket-data','tsel','Telkomsel','Paket Data Telkomsel 30 GB','Telkomsel 30 GB','30 GB',115000,false,'Paket data Telkomsel 30 GB, aktif setelah transaksi berhasil.','Paket Data',false,13),
  ('xl-data-xtra-combo-25-gb','paket-data','xl','XL Axiata','Paket Data XL Axiata Xtra Combo 25 GB','XL Axiata Xtra Combo 25 GB','Xtra Combo 25 GB',89000,false,'Paket data XL Axiata Xtra Combo 25 GB, aktif setelah transaksi berhasil.','Paket Data',false,14),
  ('indosat-data-freedom-15-gb','paket-data','isat','Indosat IM3','Paket Data Indosat IM3 Freedom 15 GB','Indosat IM3 Freedom 15 GB','Freedom 15 GB',55000,false,'Paket data Indosat IM3 Freedom 15 GB, aktif setelah transaksi berhasil.','Paket Data',false,15),
  ('tri-data-happy-32-gb','paket-data','tri','Tri','Paket Data Tri Happy 32 GB','Tri Happy 32 GB','Happy 32 GB',95000,false,'Paket data Tri Happy 32 GB, aktif setelah transaksi berhasil.','Paket Data',false,16),
  ('axis-data-bronet-10-gb','paket-data','axis','AXIS','Paket Data AXIS Bronet 10 GB','AXIS Bronet 10 GB','Bronet 10 GB',45000,false,'Paket data AXIS Bronet 10 GB, aktif setelah transaksi berhasil.','Paket Data',false,17),
  ('token-pln-20000','pln','pln','PLN','Token Listrik PLN 20.000','PLN 20.000','20.000',21500,false,'Token listrik prabayar PLN, kode token dikirim setelah transaksi berhasil.','Token Listrik',false,18),
  ('token-pln-50000','pln','pln','PLN','Token Listrik PLN 50.000','PLN 50.000','50.000',51500,false,'Token listrik prabayar PLN, kode token dikirim setelah transaksi berhasil.','Token Listrik',true,19),
  ('token-pln-100000','pln','pln','PLN','Token Listrik PLN 100.000','PLN 100.000','100.000',101500,false,'Token listrik prabayar PLN, kode token dikirim setelah transaksi berhasil.','Token Listrik',false,20),
  ('token-pln-200000','pln','pln','PLN','Token Listrik PLN 200.000','PLN 200.000','200.000',201500,false,'Token listrik prabayar PLN, kode token dikirim setelah transaksi berhasil.','Token Listrik',false,21),
  ('dana-saldo-50000','e-wallet','dana','DANA','Saldo DANA 50.000','DANA 50.000','50.000',51000,false,'Isi saldo DANA langsung ke akun terdaftar.','Saldo',false,22),
  ('dana-saldo-100000','e-wallet','dana','DANA','Saldo DANA 100.000','DANA 100.000','100.000',101000,false,'Isi saldo DANA langsung ke akun terdaftar.','Saldo',true,23),
  ('ovo-saldo-50000','e-wallet','ovo','OVO','Saldo OVO 50.000','OVO 50.000','50.000',51000,false,'Isi saldo OVO langsung ke akun terdaftar.','Saldo',false,24),
  ('ovo-saldo-100000','e-wallet','ovo','OVO','Saldo OVO 100.000','OVO 100.000','100.000',101000,false,'Isi saldo OVO langsung ke akun terdaftar.','Saldo',false,25),
  ('gopay-saldo-50000','e-wallet','gopay','GoPay','Saldo GoPay 50.000','GoPay 50.000','50.000',51000,false,'Isi saldo GoPay langsung ke akun terdaftar.','Saldo',false,26),
  ('gopay-saldo-100000','e-wallet','gopay','GoPay','Saldo GoPay 100.000','GoPay 100.000','100.000',101000,false,'Isi saldo GoPay langsung ke akun terdaftar.','Saldo',false,27),
  ('shopeepay-saldo-50000','e-wallet','spay','ShopeePay','Saldo ShopeePay 50.000','ShopeePay 50.000','50.000',51000,false,'Isi saldo ShopeePay langsung ke akun terdaftar.','Saldo',false,28),
  ('shopeepay-saldo-100000','e-wallet','spay','ShopeePay','Saldo ShopeePay 100.000','ShopeePay 100.000','100.000',101000,false,'Isi saldo ShopeePay langsung ke akun terdaftar.','Saldo',false,29),
  ('tagihan-indihome','internet-tv','ihome','IndiHome','Tagihan IndiHome','Tagihan IndiHome','Sesuai tagihan',2500,true,'Pembayaran tagihan IndiHome. Harga yang tertera adalah biaya admin; jumlah tagihan ditambahkan setelah ID dicek.','Internet & TV',false,30),
  ('tagihan-first-media','internet-tv','bfirst','First Media','Tagihan First Media','Tagihan First Media','Sesuai tagihan',2500,true,'Pembayaran tagihan First Media. Harga yang tertera adalah biaya admin; jumlah tagihan ditambahkan setelah ID dicek.','Internet & TV',false,31),
  ('iuran-bpjs-kesehatan','bpjs','bpjs','BPJS Kesehatan','Iuran BPJS Kesehatan','Iuran BPJS Kesehatan','Sesuai tagihan',2500,true,'Pembayaran iuran BPJS Kesehatan. Harga yang tertera adalah biaya admin; jumlah iuran ditambahkan setelah nomor VA dicek.','BPJS',false,32),
  ('tagihan-pdam','pdam','pdam','PDAM','Tagihan PDAM','Tagihan PDAM','Sesuai tagihan',2500,true,'Pembayaran tagihan air PDAM. Harga yang tertera adalah biaya admin; jumlah tagihan ditambahkan setelah ID dicek.','PDAM',false,33),
  ('angsuran-fifgroup','multifinance','fif','FIFGROUP','Angsuran FIFGROUP','Angsuran FIFGROUP','Sesuai tagihan',3000,true,'Pembayaran angsuran FIFGROUP. Harga yang tertera adalah biaya admin; jumlah angsuran ditambahkan setelah nomor kontrak dicek.','Multifinance',false,34),
  ('angsuran-adira','multifinance','adira','Adira Finance','Angsuran Adira Finance','Angsuran Adira Finance','Sesuai tagihan',3000,true,'Pembayaran angsuran Adira Finance. Harga yang tertera adalah biaya admin; jumlah angsuran ditambahkan setelah nomor kontrak dicek.','Multifinance',false,35);

delete from public.payment_methods;
insert into public.payment_methods (name,account_name,account_number,notes,is_active,sort_order) values
  ('QRIS','Avenzio Seven','','Bayar dengan mobile banking atau e-wallet, scan kode QR di halaman pembayaran.',true,0),
  ('Transfer Bank','Avenzio Seven','','Konfirmasi bukti transfer ke WhatsApp CS.',true,1)
;
