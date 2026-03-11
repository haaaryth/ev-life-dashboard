'use client';
import { useRouter, usePathname } from 'next/navigation';

interface NavItem { icon: string; label: string; href: string; badge?: number; adminOnly?: boolean; }

interface SidebarProps {
  role: 'admin' | 'servicecentre';
  userName: string;
  centreName?: string;
  pendingCount?: number;
}

export default function Sidebar({ role, userName, centreName, pendingCount }: SidebarProps) {
  const router = useRouter();
  const path = usePathname();

  const adminNav: NavItem[] = [
    { icon: '📊', label: 'Overview', href: '/admin' },
    { icon: '📅', label: 'Bookings', href: '/admin/bookings', badge: pendingCount },
    { icon: '👥', label: 'Users', href: '/admin/users' },
    { icon: '🏢', label: 'Service Centres', href: '/admin/centres' },
    { icon: '⚡', label: 'Charging Stations', href: '/admin/stations' },
    { icon: '🔔', label: 'Notifications', href: '/admin/notifications' },
  ];

  const centreNav: NavItem[] = [
    { icon: '📊', label: 'Dashboard', href: '/servicecentre' },
    { icon: '📋', label: 'All Bookings', href: '/servicecentre/bookings' },
    { icon: '⏳', label: 'Pending', href: '/servicecentre/pending', badge: pendingCount },
    { icon: '📅', label: 'Schedule', href: '/servicecentre/schedule' },
    { icon: '🏢', label: 'Centre Profile', href: '/servicecentre/profile' },
  ];

  const nav = role === 'admin' ? adminNav : centreNav;

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const S: Record<string, React.CSSProperties> = {
    sidebar: { width: 220, background: '#141420', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, fontFamily: 'Outfit, sans-serif' },
    logo: { display: 'flex', alignItems: 'center', gap: 10, padding: '22px 20px 18px' },
    bolt: { width: 32, height: 32, background: '#00D68F', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 },
    badge: { margin: '0 12px 16px', background: 'rgba(0,214,143,0.10)', border: '1px solid rgba(0,214,143,0.20)', borderRadius: 10, padding: '9px 12px' },
    nav: { flex: 1, padding: '6px 10px', overflowY: 'auto' as const },
    footer: { padding: 14, borderTop: '1px solid rgba(255,255,255,0.07)' },
    signout: { width: '100%', background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 10, padding: 10, fontSize: 12, fontWeight: 700, color: '#FF4757', fontFamily: 'Outfit', cursor: 'pointer' },
  };

  return (
    <aside style={S.sidebar}>
      <div style={S.logo}>
        <div style={S.bolt}>⚡</div>
        <span style={{ fontSize: 17, fontWeight: 700, color: '#F1F2F6' }}>EVLife</span>
      </div>
      <div style={S.badge}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#00D68F' }}>{userName}</div>
        <div style={{ fontSize: 10, color: '#44445A' }}>
          {role === 'admin' ? 'System Administrator' : centreName || 'Service Centre'}
        </div>
      </div>
      <nav style={S.nav}>
        {nav.map(item => {
          const active = path === item.href;
          return (
            <div
              key={item.href}
              onClick={() => router.push(item.href)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                borderRadius: 10, cursor: 'pointer', marginBottom: 2, fontSize: 13,
                color: active ? '#00D68F' : '#8E8FA8',
                background: active ? 'rgba(0,214,143,0.10)' : 'transparent',
                border: `1px solid ${active ? 'rgba(0,214,143,0.20)' : 'transparent'}`,
                transition: 'all .15s',
              }}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge != null && item.badge > 0 && (
                <span style={{ background: '#FF4757', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 8 }}>
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </nav>
      <div style={S.footer}>
        <button style={S.signout} onClick={logout}>Sign Out</button>
      </div>
    </aside>
  );
}
