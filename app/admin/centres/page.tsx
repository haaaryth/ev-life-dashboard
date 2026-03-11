'use client';
import { useEffect, useState } from 'react';
import DataTable from '@/components/ui/DataTable';
import StatusPill from '@/components/ui/StatusPill';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';

const blank = { name: '', location: '', contact: '', hours: '', adminEmail: '' };

export default function AdminCentres() {
  const [centres, setCentres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState(blank);

  const load = async () => { setLoading(true); const r = await fetch('/api/centres'); setCentres(await r.json()); setLoading(false); };
  useEffect(() => { load(); }, []);

  const del = async (id: string) => {
    if (!confirm('Delete this centre?')) return;
    await fetch('/api/centres/' + id, { method: 'DELETE' });
    setToast('Centre deleted'); load();
  };

  const submitAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/centres', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setToast('Centre added'); setAddOpen(false); setForm(blank); load();
  };

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/centres/' + editItem.id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setToast('Centre updated'); setEditItem(null); load();
  };

  const inp = { width: '100%', background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#F1F2F6', fontFamily: 'Outfit', outline: 'none', marginBottom: 12 };
  const Btn = ({ onClick, color, children }: any) => <button onClick={onClick} style={{ background: color + '20', border: '1px solid ' + color + '40', color, padding: '4px 9px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit', marginRight: 4 }}>{children}</button>;

  const cols = [
    { key: 'name', label: 'Centre Name', render: (v: string) => <span style={{ color: '#F1F2F6', fontWeight: 700 }}>{v}</span> },
    { key: 'location', label: 'Location' },
    { key: 'contact', label: 'Contact' },
    { key: 'hours', label: 'Hours', render: (v: string) => <span style={{ fontSize: 11 }}>{v}</span> },
    { key: 'rating', label: 'Rating', render: (v: number) => v ? '⭐ ' + v : 'N/A' },
    { key: 'status', label: 'Status', render: (v: string) => <StatusPill status={v || 'active'} /> },
    { key: 'id', label: 'Actions', render: (_: any, r: any) => <div><Btn onClick={() => { setEditItem(r); setForm({ name: r.name, location: r.location, contact: r.contact, hours: r.hours, adminEmail: r.adminEmail||'' }); }} color="#54A0FF">Edit</Btn><Btn onClick={() => del(r.id)} color="#FF4757">🗑</Btn></div> },
  ];

  const FormFields = () => (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <input style={inp} placeholder="Centre name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required />
        <input style={inp} placeholder="Location" value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} required />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <input style={inp} placeholder="Contact e.g. 03-1234 5678" value={form.contact} onChange={e => setForm(f => ({...f, contact: e.target.value}))} />
        <input style={inp} placeholder="Hours e.g. Mon–Fri 9am–6pm" value={form.hours} onChange={e => setForm(f => ({...f, hours: e.target.value}))} />
      </div>
      <input style={inp} type="email" placeholder="Admin email (for portal login)" value={form.adminEmail} onChange={e => setForm(f => ({...f, adminEmail: e.target.value}))} />
    </>
  );

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Service Centres</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button onClick={() => { setForm(blank); setAddOpen(true); }} style={{ background: '#00D68F', border: 'none', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 700, color: '#000', fontFamily: 'Outfit', cursor: 'pointer' }}>+ Add Centre</button>
      </div>
      <div style={{ background: '#141420', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', fontWeight: 700, fontSize: 13 }}>Service Centres <span style={{ color: '#44445A', fontWeight: 400, fontSize: 12, marginLeft: 8 }}>{centres.length} centres</span></div>
        <DataTable columns={cols} data={centres} emptyMessage="No service centres yet" />
      </div>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Service Centre">
        <form onSubmit={submitAdd}><FormFields /><div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button type="button" onClick={() => setAddOpen(false)} style={{ background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 20px', color: '#8E8FA8', fontFamily: 'Outfit', cursor: 'pointer' }}>Cancel</button>
          <button type="submit" style={{ background: '#00D68F', border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 700, color: '#000', fontFamily: 'Outfit', cursor: 'pointer' }}>Add</button>
        </div></form>
      </Modal>
      <Modal open={!!editItem} onClose={() => setEditItem(null)} title="Edit Service Centre">
        <form onSubmit={submitEdit}><FormFields /><div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button type="button" onClick={() => setEditItem(null)} style={{ background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 20px', color: '#8E8FA8', fontFamily: 'Outfit', cursor: 'pointer' }}>Cancel</button>
          <button type="submit" style={{ background: '#00D68F', border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 700, color: '#000', fontFamily: 'Outfit', cursor: 'pointer' }}>Save</button>
        </div></form>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  );
}
