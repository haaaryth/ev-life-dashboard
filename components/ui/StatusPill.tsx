const MAP: Record<string, { bg: string; color: string }> = {
  pending:   { bg: 'rgba(255,165,2,.12)',   color: '#FFA502' },
  confirmed: { bg: 'rgba(84,160,255,.12)',  color: '#54A0FF' },
  completed: { bg: 'rgba(0,214,143,.12)',   color: '#00D68F' },
  cancelled: { bg: 'rgba(255,71,87,.12)',   color: '#FF4757' },
  active:    { bg: 'rgba(0,214,143,.12)',   color: '#00D68F' },
  suspended: { bg: 'rgba(255,71,87,.12)',   color: '#FF4757' },
  online:    { bg: 'rgba(0,214,143,.12)',   color: '#00D68F' },
  offline:   { bg: 'rgba(255,71,87,.12)',   color: '#FF4757' },
  busy:      { bg: 'rgba(255,165,2,.12)',   color: '#FFA502' },
  review:    { bg: 'rgba(255,165,2,.12)',   color: '#FFA502' },
};
export default function StatusPill({ status }: { status: string }) {
  const s = MAP[status] || { bg: 'rgba(255,255,255,0.05)', color: '#8E8FA8' };
  return <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>{status}</span>;
}
