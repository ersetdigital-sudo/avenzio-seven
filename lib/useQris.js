'use client';

import { qrisUrl, usePaymentMethods } from './usePaymentMethods';

/** Foto QRIS aktif (dari database) untuk layar bayar. Kosong jika belum dikonfigurasi. */
export function useQris() {
  const { qris } = usePaymentMethods();
  return qrisUrl(qris);
}
