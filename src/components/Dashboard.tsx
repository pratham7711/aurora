import { useState, useEffect, useRef } from 'react';
import { dataPoints, activityEvents, categories, categoryColors } from '../data/globeData';
import type { Category } from '../data/globeData';

function AnimatedNumber({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const startRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = 0;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{value.toLocaleString()}{suffix}</span>;
}

function Sparkline({ data, color, width = 120, height = 32 }: { data: number[]; color: string; width?: number; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        fill={`url(#grad-${color.replace('#', '')})`}
        points={`0,${height} ${points} ${width},${height}`}
      />
    </svg>
  );
}

function generateSparklineData(): number[] {
  const data: number[] = [];
  let val = 50 + Math.random() * 30;
  for (let i = 0; i < 20; i++) {
    val += (Math.random() - 0.4) * 10;
    val = Math.max(10, Math.min(100, val));
    data.push(val);
  }
  return data;
}

const eventIcons: Record<string, string> = {
  commit: '⟩⟩',
  deploy: '▲',
  star: '★',
  launch: '◆',
};

const eventColors: Record<string, string> = {
  commit: '#06B6D4',
  deploy: '#10B981',
  star: '#F59E0B',
  launch: '#A78BFA',
};

interface DashboardProps {
  activeCategory: Category | 'All';
  onCategoryChange: (cat: Category | 'All') => void;
}

export default function Dashboard({ activeCategory, onCategoryChange }: DashboardProps) {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % activityEvents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalDevs = dataPoints.reduce((sum, p) => sum + p.developers, 0);
  const totalCommits = dataPoints.reduce((sum, p) => sum + p.commits, 0);

  const topCities = [...dataPoints]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const maxValue = topCities[0]?.value || 100;

  const visibleEvents = [];
  for (let i = 0; i < 6; i++) {
    visibleEvents.push(activityEvents[(currentEventIndex + i) % activityEvents.length]);
  }

  const sparklineData = useRef(
    Array.from({ length: 3 }, () => generateSparklineData())
  ).current;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      background: 'linear-gradient(270deg, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.7) 85%, transparent 100%)',
      padding: '32px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      overflowY: 'auto',
      zIndex: 10,
    }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 8px rgba(16,185,129,0.6)',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#10B981', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Live Dashboard
          </span>
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #06B6D4, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AURORA
        </h1>
        <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Global Developer Activity Monitor</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        {[
          { label: 'Global Devs', value: totalDevs, suffix: '', spark: sparklineData[0], color: '#06B6D4' },
          { label: 'Active Repos', value: Math.floor(totalCommits / 8), suffix: '', spark: sparklineData[1], color: '#10B981' },
          { label: 'Deploys/sec', value: 847, suffix: '', spark: sparklineData[2], color: '#A78BFA' },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: 'rgba(6, 182, 212, 0.04)',
            border: '1px solid rgba(6, 182, 212, 0.08)',
            borderRadius: '12px',
            padding: '14px 12px 10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: stat.color, marginBottom: '2px' }}>
              <AnimatedNumber target={stat.value} />
            </div>
            <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 500, letterSpacing: '0.5px', marginBottom: '8px' }}>
              {stat.label}
            </div>
            <Sparkline data={stat.spark} color={stat.color} width={80} height={24} />
          </div>
        ))}
      </div>

      {/* Category Filters */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
          Filter by Category
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {(['All', ...categories] as (Category | 'All')[]).map((cat) => {
            const isActive = activeCategory === cat;
            const color = cat === 'All' ? '#06B6D4' : categoryColors[cat];
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                style={{
                  background: isActive ? `${color}22` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? `${color}66` : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? color : '#64748B',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Cities Leaderboard */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
          Top Cities
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {topCities.map((city, i) => {
            const barWidth = (city.value / maxValue) * 100;
            const color = categoryColors[city.category];
            return (
              <div key={city.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', width: '16px' }}>{i + 1}</span>
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>{city.flag} {city.city}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color }}>{city.value}</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${barWidth}%`,
                    background: `linear-gradient(90deg, ${color}, ${color}88)`,
                    borderRadius: '2px',
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Feed */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
          Live Activity
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflow: 'hidden' }}>
          {visibleEvents.map((event, i) => (
            <div
              key={`${event.city}-${event.time}-${i}`}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                padding: '10px 12px',
                background: i === 0 ? 'rgba(6, 182, 212, 0.06)' : 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                border: i === 0 ? '1px solid rgba(6, 182, 212, 0.12)' : '1px solid transparent',
                transition: 'all 0.5s ease',
                opacity: 1 - i * 0.1,
              }}
            >
              <span style={{
                fontSize: '12px',
                color: eventColors[event.type],
                fontWeight: 700,
                width: '16px',
                textAlign: 'center',
                flexShrink: 0,
                marginTop: '1px',
              }}>
                {eventIcons[event.type]}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: 500, lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {event.message}
                </div>
                <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>
                  {event.city} · {event.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
