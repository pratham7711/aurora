import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import Dashboard from './components/Dashboard';
import InfoCard from './components/InfoCard';
import ErrorBoundary from './components/ErrorBoundary';
import type { DataPoint, Category } from './data/globeData';

// Lazy-load the Globe — Three.js is ~800 KB and doesn't need to block the
// initial paint. The Dashboard and InfoCard load instantly.
const Globe = lazy(() => import('./components/Globe'));

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

/** Shown while the Globe chunk is downloading */
function GlobeFallback() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        background: 'radial-gradient(ellipse at center, #050d1a 0%, #020811 100%)',
        zIndex: 0,
      }}
    >
      {/* Pulsing globe placeholder */}
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #0e4a7a 0%, #051428 70%)',
          border: '1px solid rgba(6,182,212,0.2)',
          boxShadow: '0 0 60px rgba(6,182,212,0.12)',
          animation: 'globePulse 2s ease-in-out infinite',
        }}
      />
      <div
        style={{
          fontSize: 13,
          color: 'rgba(100,200,220,0.7)',
          letterSpacing: '0.15em',
          fontWeight: 500,
          textTransform: 'uppercase',
        }}
      >
        Initialising Globe…
      </div>

      <style>{`
        @keyframes globePulse {
          0%, 100% { transform: scale(1);   opacity: 0.6; box-shadow: 0 0 60px rgba(6,182,212,0.12); }
          50%       { transform: scale(1.04); opacity: 1;   box-shadow: 0 0 90px rgba(6,182,212,0.25); }
        }
      `}</style>
    </div>
  );
}

function App() {
  const isMobile = useIsMobile();
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [screenPos, setScreenPos] = useState<{ x: number; y: number } | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const handleHover = useCallback(
    (point: DataPoint | null, pos: { x: number; y: number } | null) => {
      setHoveredPoint(point);
      setScreenPos(pos);
    },
    []
  );

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle radial gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 30% 50%, rgba(6,182,212,0.03) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* 3D Globe — deferred until Three.js chunk is loaded */}
      <ErrorBoundary>
        <Suspense fallback={<GlobeFallback />}>
          <Globe onHover={handleHover} activeCategory={activeCategory} isMobile={isMobile} />
        </Suspense>
      </ErrorBoundary>

      {/* Info Card on hover / tap */}
      <InfoCard point={hoveredPoint} screenPos={screenPos} isMobile={isMobile} />

      {/* Dashboard Panel */}
      <Dashboard activeCategory={activeCategory} onCategoryChange={setActiveCategory} isMobile={isMobile} />

      {/* Bottom-left branding — hidden on mobile */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '28px',
          zIndex: 10,
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: '10px', color: '#64748B', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 500 }}>
            Powered by
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '3px',
            background: 'linear-gradient(135deg, #06B6D4, #10B981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            AURORA
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
