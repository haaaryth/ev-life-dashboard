'use client';
import { useEffect } from 'react';
interface ToastProps { message: string; type?: 'success' | 'error'; onClose: () => void; }
export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  if (!message) return null;
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, background: type === 'success' ? 'rgba(0,214,143,0.08)' : 'rgba(255,71,87,0.08)', border: `1px solid ${type === 'success' ? 'rgba(0,214,143,0.2)' : 'rgba(255,71,87,0.3)'}`, borderRadius: 12, padding: '14px 18px', fontSize: 13, color: '#F1F2F6', zIndex: 999, display: 'flex', alignItems: 'center', gap: 10, maxWidth: 320, fontFamily: 'Outfit, sans-serif' }}>
      <span>{type === 'success' ? '✅' : '❌'}</span>{message}
    </div>
  );
}
