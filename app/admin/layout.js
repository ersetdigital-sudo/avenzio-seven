import '@/app/styles/admin.css';

import AdminLogin from '@/components/admin/AdminLogin';
import AdminShell from '@/components/admin/AdminShell';
import { isAdmin } from '@/lib/server/adminAuth';

export const metadata = {
  title: { default: 'Admin', template: '%s · Admin Avenzio Seven' },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }) {
  const ok = await isAdmin();

  if (!ok) {
    return (
      <div className="av-admin">
        <AdminLogin />
      </div>
    );
  }

  return (
    <div className="av-admin">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
