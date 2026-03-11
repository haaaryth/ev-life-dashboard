'use client';
import { useEffect, useState } from 'react';
import StatusPill from '@/components/ui/StatusPill';
import Toast from '@/components/ui/Toast';

const SLOTS = ['09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM'];

export default function SCSchedule() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [day, setDay] = useState(new Date());
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetch('/api/bookings').then(r => r.json()).then(setBookings);
  }, []);

  const dateStr = day.toISOString().split('T')[0];
  const dayBookings = bookings.filter(b => b.date === dateStr);
  const dayLabel = day.toLocaleDateString('en-MY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const changeDay = (d: number) => { const nd = new Date(day); nd.setDate(nd.getDate() + d); setDay(nd); };

  const confirm = async (id: string) => {
    await fetch('/api/bookings/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'confirmed' }) });
    setToast('Confirmed'); fetch('/api/bookings').then(r => r.json()).then(setBookings);
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Schedule</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <button onClick={() => changeDay(-1)} style={{ background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '9px 16px', color: '#8E8FA8', fontFamily: 'Outfit', cursor: 'pointer', fontSize: 13 }}>← Prev</button>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 700 }}>{dayLabel}</div>
        <button onClick={() => changeDay(1)} style={{ background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '9px 16px', color: '#8E8FA8', fontFamily: 'Outfit', cursor: 'pointer', fontSize: 13 }}>Next →</button>
      </div>
      <div style={{ background: '#141420', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {SLOTS.map(slot => {
          const bkg = dayBookings.find(b => b.time === slot);
          return (
            <div key={slot} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: '#1C1C2E', borderRadius: 10, borderLeft: '3px solid ' + (bkg ? (bkg.status === 'pending' ? '#FFA502' : '#00D68F') : 'transparent'), opacity: bkg ? 1 : 0.35 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#44445A', minWidth: 68 }}>{slot}</span>
              {bkg ? <>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F1F2F6' }}>{bkg.userName}</div>
                  <div style={{ fontSize: 11, color: '#44445A' }}>{bkg.service} · {bkg.amount ? 'RM ' + bkg.amount : 'FREE'}</div>
                </div>
                <StatusPill status={bkg.status} />
                {bkg.status === 'pending' && <button onClick={() => confirm(bkg.id)} style={{ background: 'rgba(0,214,143,.12)', border: '1px solid rgba(0,214,143,.2)', color: '#00D68F', padding: '4px 10px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit' }}>✓</button>}
              </> : <span style={{ fontSize: 12, color: '#44445A' }}>Available</span>}
            </div>
          );
        })}
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  );
}
