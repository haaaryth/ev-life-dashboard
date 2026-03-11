'use client';
import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';

export default function AdminNotifications() {
  const [notifs, setNotifs] = useState<any[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ title: '', message: '', type: 'info' });

  const load = async () => { const r = await fetch('/api/notifications'); setNotifs(await r.json()); };
  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    await fetch('/api/notifications', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read: true }) });
    load();
  };

  const del = async (id: string) => {
    await fetch('/api/notifications', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setToast('Deleted'); load();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setToast('Notification sent'); setAddOpen(false); setForm({ title: '', message: '', type: 'info' }); load();
  };

  const typeColor = (t: string) => t === 'error' ? '#FF4757' : t === 'warning' ? '#FFA502' : '#54A0FF';
  const typeIcon = (t: string) => t === 'error' ? '🚨' : t === 'warning' ? '⚠️' : 'ℹ️';
  const inp = { width: '100%', background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#F1F2F6', fontFamily: 'Outfit', outline: 'none', marginBottom: 12 };

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Notifications</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button onClick={() => setAddOpen(true)} style={{ background: '#00D68F', border: 'none', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 700, color: '#000', fontFamily: 'Outfit', cursor: 'pointer' }}>+ Send Notification</button>
      </div>
      <div style={{ background: '#141420', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', fontWeight: 700, fontSize: 13 }}>System Notifications</div>
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {notifs.length === 0 ? <div style={{ textAlign: 'center', padding: 40, color: '#44445A' }}>No notifications</div> :
          notifs.map(n => (
            <div key={n.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, opacity: n.read ? 0.55 : 1 }}>
              <span style={{ fontSize: 22 }}>{typeIcon(n.type)}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F1F2F6', marginBottom: 3 }}>{n.title}</div>
                <div style={{ fontSize: 11, color: '#44445A' }}>{n.message}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {!n.read && <button onClick={() => markRead(n.id)} style={{ background: 'rgba(84,160,255,.12)', border: '1px solid rgba(84,160,255,.2)', color: '#54A0FF', padding: '4px 10px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit' }}>Mark Read</button>}
                <button onClick={() => del(n.id)} style={{ background: 'rgba(255,71,87,.12)', border: '1px solid rgba(255,71,87,.2)', color: '#FF4757', padding: '4px 10px', borderRadius: 7, fontSize: 11, cursor: 'pointer', fontFamily: 'Outfit' }}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Send Notification">
        <form onSubmit={submit}>
          <input style={inp} placeholder="Notification title" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} required />
          <textarea style={{ ...inp, minHeight: 80, resize: 'vertical' as const }} placeholder="Message..." value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} required />
          <select style={inp} value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}>
            <option value="info">Info</option><option value="warning">Warning</option><option value="error">Critical</option>
          </select>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setAddOpen(false)} style={{ background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 20px', color: '#8E8FA8', fontFamily: 'Outfit', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ background: '#00D68F', border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 700, color: '#000', fontFamily: 'Outfit', cursor: 'pointer' }}>Send</button>
          </div>
        </form>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  );
}
