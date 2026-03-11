'use client';
import { useEffect, useState } from 'react';
import StatusPill from '@/components/ui/StatusPill';
import Toast from '@/components/ui/Toast';

export default function SCPending() {
  const [pending, setPending] = useState<any[]>([]);
  const [toast, setToast] = useState('');

  const load = async () => {
    const r = await fetch('/api/bookings?status=pending');
    setPending(await r.json());
  };
  useEffect(() => { load(); }, []);

  const act = async (id: string, status: string) => {
    await fetch('/api/bookings/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    setToast('Booking ' + status); load();
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Pending Review</h1>
      <div style={{ background: '#141420', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', fontWeight: 700, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
          <span>Pending Bookings</span>
          <span style={{ color: pending.length > 0 ? '#FFA502' : '#00D68F', fontSize: 12, fontWeight: 400 }}>{pending.length > 0 ? pending.length + ' requiring action' : 'All clear ✓'}</span>
        </div>
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {pending.length === 0
            ? <div style={{ textAlign: 'center', padding: 48, color: '#00D68F', fontWeight: 700 }}>✅ No pending bookings</div>
            : pending.map(b => (
              <div key={b.id} style={{ background: '#1C1C2E', border: '1px solid rgba(255,165,2,0.2)', borderRadius: 14, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#F1F2F6', marginBottom: 3 }}>{b.userName}</div>
                    <div style={{ fontSize: 12, color: '#44445A' }}>{b.service} · {b.date} {b.time} · {b.amount ? 'RM ' + b.amount : 'FREE'}</div>
                    <div style={{ fontSize: 11, color: '#44445A', marginTop: 3 }}>{b.userEmail} · {b.vehicleMake} {b.vehicleModel}</div>
                  </div>
                  <StatusPill status="pending" />
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button onClick={() => act(b.id,'confirmed')} style={{ background: 'rgba(0,214,143,.12)', border: '1px solid rgba(0,214,143,.2)', color: '#00D68F', padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit' }}>✓ Confirm Booking</button>
                  <button onClick={() => act(b.id,'cancelled')} style={{ background: 'rgba(255,71,87,.12)', border: '1px solid rgba(255,71,87,.2)', color: '#FF4757', padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit' }}>✗ Decline</button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  );
}
