import { categoryColors } from '../data/globeData';
import type { DataPoint } from '../data/globeData';

interface InfoCardProps {
  point: DataPoint | null;
  screenPos: { x: number; y: number } | null;
  isMobile?: boolean;
}

export default function InfoCard({ point, screenPos, isMobile = false }: InfoCardProps) {
  if (!point || !screenPos) return null;

  const color = categoryColors[point.category];
  const trendUp = point.trend > 0;

  // ── Mobile: fixed bottom card, sits above the dashboard bottom sheet ──
  if (isMobile) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '64px',
          left: '12px',
          right: '12px',
          background: 'rgba(3, 7, 18, 0.95)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${color}33`,
          borderRadius: '16px',
          padding: '14px 16px',
          zIndex: 25,
          pointerEvents: 'none',
          animation: 'cardFadeIn 0.2s ease-out',
          boxShadow: `0 0 30px ${color}15, 0 4px 20px rgba(0,0,0,0.5)`,
        }}
      >
        {/* City + Flag + Category */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>{point.flag}</span>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>{point.city}</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>{point.country}</div>
            </div>
          </div>
          <div style={{
            background: `${color}18`,
            border: `1px solid ${color}44`,
            borderRadius: '6px',
            padding: '3px 10px',
            fontSize: '10px',
            fontWeight: 600,
            color: color,
            letterSpacing: '0.5px',
          }}>
            {point.category}
          </div>
        </div>

        {/* Metrics + Trend in one row */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '2px' }}>Developers</div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>{(point.developers / 1000).toFixed(0)}k</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '2px' }}>Commits/mo</div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>{(point.commits / 1000).toFixed(0)}k</div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            background: trendUp ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            borderRadius: '8px',
            border: `1px solid ${trendUp ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}`,
          }}>
            <span style={{ fontSize: '14px', color: trendUp ? '#10B981' : '#EF4444' }}>
              {trendUp ? '↗' : '↘'}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: trendUp ? '#10B981' : '#EF4444' }}>
              {trendUp ? '+' : ''}{point.trend}%
            </span>
          </div>
        </div>

        <style>{`
          @keyframes cardFadeIn {
            from { opacity: 0; transform: translateY(8px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    );
  }

  // ── Desktop: floating tooltip near the hovered point ──
  const cardWidth = 260;
  const cardHeight = 160;
  let x = screenPos.x + 20;
  let y = screenPos.y - cardHeight / 2;

  if (x + cardWidth > window.innerWidth - 420) {
    x = screenPos.x - cardWidth - 20;
  }
  if (y < 20) y = 20;
  if (y + cardHeight > window.innerHeight - 20) y = window.innerHeight - cardHeight - 20;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: cardWidth,
        background: 'rgba(3, 7, 18, 0.92)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${color}33`,
        borderRadius: '14px',
        padding: '18px',
        zIndex: 20,
        pointerEvents: 'none',
        animation: 'cardFadeIn 0.2s ease-out',
        boxShadow: `0 0 30px ${color}15, 0 4px 20px rgba(0,0,0,0.4)`,
      }}
    >
      {/* City + Flag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>{point.flag}</span>
            {point.city}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{point.country}</div>
        </div>
        <div style={{
          background: `${color}18`,
          border: `1px solid ${color}44`,
          borderRadius: '6px',
          padding: '3px 10px',
          fontSize: '10px',
          fontWeight: 600,
          color: color,
          letterSpacing: '0.5px',
        }}>
          {point.category}
        </div>
      </div>

      {/* Metrics row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '2px' }}>Developers</div>
          <div style={{ fontSize: '15px', fontWeight: 700 }}>{(point.developers / 1000).toFixed(0)}k</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '2px' }}>Commits/mo</div>
          <div style={{ fontSize: '15px', fontWeight: 700 }}>{(point.commits / 1000).toFixed(0)}k</div>
        </div>
      </div>

      {/* Trend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 10px',
        background: trendUp ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
        borderRadius: '8px',
        border: `1px solid ${trendUp ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}`,
      }}>
        <span style={{ fontSize: '14px', color: trendUp ? '#10B981' : '#EF4444' }}>
          {trendUp ? '↗' : '↘'}
        </span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: trendUp ? '#10B981' : '#EF4444' }}>
          {trendUp ? '+' : ''}{point.trend}%
        </span>
        <span style={{ fontSize: '11px', color: '#64748B' }}>growth this quarter</span>
      </div>

      <style>{`
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
