'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); return; }
      router.push(data.role === 'admin' ? '/admin' : '/servicecentre');
      router.refresh();
    } catch {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'Outfit, sans-serif' }}>
      <div style={{ background: '#141420', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: 40, width: '100%', maxWidth: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 42, height: 42, background: '#00D68F', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>⚡</div>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#F1F2F6' }}>EVLife</span>
        </div>
        <p style={{ fontSize: 13, color: '#44445A', marginBottom: 28 }}>Management Dashboard</p>

        <form onSubmit={handleLogin}>
          <label style={{ fontSize: 11, fontWeight: 700, color: '#44445A', letterSpacing: '.5px', display: 'block', marginBottom: 6 }}>EMAIL</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)} required
            placeholder="admin@evlife.my"
            style={{ width: '100%', background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '13px 16px', fontSize: 14, color: '#F1F2F6', outline: 'none', marginBottom: 14, fontFamily: 'Outfit' }}
          />
          <label style={{ fontSize: 11, fontWeight: 700, color: '#44445A', letterSpacing: '.5px', display: 'block', marginBottom: 6 }}>PASSWORD</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)} required
            placeholder="••••••••"
            style={{ width: '100%', background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '13px 16px', fontSize: 14, color: '#F1F2F6', outline: 'none', marginBottom: 6, fontFamily: 'Outfit' }}
          />
          {error && <p style={{ color: '#FF4757', fontSize: 12, marginBottom: 12 }}>{error}</p>}
          <button
            type="submit" disabled={loading}
            style={{ width: '100%', background: '#00D68F', border: 'none', borderRadius: 12, padding: 15, fontSize: 15, fontWeight: 700, color: '#000', fontFamily: 'Outfit', cursor: 'pointer', marginTop: 8, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: 24, padding: 16, background: '#1C1C2E', borderRadius: 12, fontSize: 12, color: '#44445A', lineHeight: 1.8 }}>
          <div style={{ color: '#00D68F', fontWeight: 700, marginBottom: 4 }}>Demo Credentials</div>
          <div>Admin: <span style={{ color: '#8E8FA8' }}>admin@evlife.my / Admin@123</span></div>
          <div>Centre: <span style={{ color: '#8E8FA8' }}>centre@evlife.my / Centre@123</span></div>
        </div>
      </div>
    </div>
  );
}
