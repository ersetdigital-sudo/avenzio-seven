import Redirect from '@/components/Redirect';

export const metadata = { title: 'Katalog', robots: { index: false } };

export default function KatalogPage() {
  return <Redirect keepHash />;
}
