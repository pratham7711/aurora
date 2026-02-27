import { useState, useCallback } from 'react';
import Globe from './components/Globe';
import Dashboard from './components/Dashboard';
import InfoCard from './components/InfoCard';
import ErrorBoundary from './components/ErrorBoundary';
import type { DataPoint, Category } from './data/globeData';

function App() {
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

      {/* 3D Globe */}
      <ErrorBoundary>
        <Globe onHover={handleHover} activeCategory={activeCategory} />
      </ErrorBoundary>

      {/* Info Card on hover */}
      <InfoCard point={hoveredPoint} screenPos={screenPos} />

      {/* Dashboard Panel */}
      <Dashboard activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* Bottom-left branding */}
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
    </div>
  );
}

export default App;
