interface StatCardProps { label: string; value: string | number; sub?: string; color?: string; }
export default function StatCard({ label, value, sub, color = '#F1F2F6' }: StatCardProps) {
  return (
    <div style={{ background: '#141420', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '18px 20px', fontFamily: 'Outfit, sans-serif' }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#44445A', letterSpacing: '.8px', textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1, marginBottom: 4, color }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#44445A' }}>{sub}</div>}
    </div>
  );
}
