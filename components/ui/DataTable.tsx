'use client';
interface Column { key: string; label: string; render?: (val: any, row: any) => React.ReactNode; }
interface Props { columns: Column[]; data: any[]; emptyMessage?: string; }

export default function DataTable({ columns, data, emptyMessage = 'No data found' }: Props) {
  if (data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 20px', color: '#44445A', fontFamily: 'Outfit, sans-serif' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
        <div style={{ fontSize: 13 }}>{emptyMessage}</div>
      </div>
    );
  }
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Outfit, sans-serif' }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 10, fontWeight: 700, color: '#44445A', letterSpacing: '.6px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1C1C2E')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {columns.map(col => (
                <td key={col.key} style={{ padding: '13px 16px', fontSize: 13, color: '#8E8FA8' }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
