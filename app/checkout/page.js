import Redirect from '@/components/Redirect';

export const metadata = { title: 'Checkout', robots: { index: false } };

export default function CheckoutPage() {
  return <Redirect keepHash />;
}
