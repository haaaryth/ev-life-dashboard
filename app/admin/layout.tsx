import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import Sidebar from '@/components/layout/Sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  if (user.role !== 'admin') redirect('/servicecentre');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Outfit, sans-serif' }}>
      <Sidebar role="admin" userName={user.email.split('@')[0]} />
      <main style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ background: '#141420', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 7, height: 7, background: '#00D68F', borderRadius: '50%' }}></div>
            <span style={{ fontSize: 11, color: '#00D68F' }}>Live</span>
          </div>
          <span style={{ fontSize: 11, color: '#44445A' }}>System Administrator</span>
        </div>
        <div style={{ flex: 1, padding: 28 }}>{children}</div>
      </main>
    </div>
  );
}
