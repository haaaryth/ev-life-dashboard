'use client';
interface ModalProps { open: boolean; onClose: () => void; title: string; children: React.ReactNode; }
export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#141420', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: 28, width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto', fontFamily: 'Outfit, sans-serif' }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#F1F2F6', marginBottom: 20 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}
