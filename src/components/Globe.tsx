import { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';
import { dataPoints, arcs, categoryColors } from '../data/globeData';
import type { DataPoint, Category } from '../data/globeData';

const GLOBE_RADIUS = 2;

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

const EARTH_TEXTURE_URL =
  'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg';

function GlobeSphere() {
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(EARTH_TEXTURE_URL, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      setEarthTexture(texture);
    });
  }, []);

  return (
    <group>
      {/* Earth sphere with realistic texture */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture ?? undefined}
          color={earthTexture ? '#ffffff' : '#0a1628'}
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>
      {/* Inner atmosphere halo — tight blue ring */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.08, 64, 64]} />
        <meshBasicMaterial
          color="#60B8FF"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Outer atmosphere bloom */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.3, 64, 64]} />
        <meshBasicMaterial
          color="#1E90FF"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Wide diffuse glow */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.6, 64, 64]} />
        <meshBasicMaterial
          color="#0A4DCC"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

interface DataPointMeshProps {
  point: DataPoint;
  onHover: (point: DataPoint | null, screenPos: { x: number; y: number } | null) => void;
  isFiltered: boolean;
  isMobile: boolean;
}

function DataPointMesh({ point, onHover, isFiltered, isMobile }: DataPointMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { camera, size } = useThree();

  const position = useMemo(
    () => latLngToVector3(point.lat, point.lng, GLOBE_RADIUS + 0.02),
    [point.lat, point.lng]
  );

  const color = categoryColors[point.category];
  // Slightly larger hit targets on mobile
  const baseScale = (isMobile ? 1.3 : 1) * (0.015 + (point.value / 100) * 0.025);

  useFrame(() => {
    if (meshRef.current) {
      const target = hovered ? baseScale * 2.2 : baseScale;
      meshRef.current.scale.lerp(
        new THREE.Vector3(target, target, target),
        0.1
      );
    }
    if (glowRef.current) {
      const target = hovered ? baseScale * 5 : baseScale * 3;
      glowRef.current.scale.lerp(
        new THREE.Vector3(target, target, target),
        0.1
      );
    }
  });

  const handlePointerOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHovered(true);
      if (!isMobile) document.body.style.cursor = 'pointer';
      const projected = position.clone().project(camera);
      const x = (projected.x * 0.5 + 0.5) * size.width;
      const y = (-projected.y * 0.5 + 0.5) * size.height;
      onHover(point, { x, y });
    },
    [camera, size, position, point, onHover, isMobile]
  );

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    if (!isMobile) document.body.style.cursor = 'default';
    onHover(null, null);
  }, [onHover, isMobile]);

  if (!isFiltered) return null;

  return (
    <group position={position}>
      {/* Core point */}
      <mesh
        ref={meshRef}
        scale={[baseScale, baseScale, baseScale]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Glow */}
      <mesh ref={glowRef} scale={[baseScale * 3, baseScale * 3, baseScale * 3]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function ArcLine({ fromPoint, toPoint }: { fromPoint: DataPoint; toPoint: DataPoint }) {
  const progressRef = useRef(Math.random());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineRef = useRef<any>(null);

  const points = useMemo(() => {
    const start = latLngToVector3(fromPoint.lat, fromPoint.lng, GLOBE_RADIUS + 0.03);
    const end = latLngToVector3(toPoint.lat, toPoint.lng, GLOBE_RADIUS + 0.03);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    mid.normalize().multiplyScalar(GLOBE_RADIUS + 0.03 + dist * 0.35);

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(64).map((p) => [p.x, p.y, p.z] as [number, number, number]);
  }, [fromPoint, toPoint]);

  useFrame((_, delta) => {
    progressRef.current = (progressRef.current + delta * 0.15) % 1;
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.15 + Math.sin(progressRef.current * Math.PI * 2) * 0.1;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color="#06B6D4"
      transparent
      opacity={0.2}
      lineWidth={1}
    />
  );
}

function RotatingGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

interface SceneProps {
  onHover: (point: DataPoint | null, screenPos: { x: number; y: number } | null) => void;
  activeCategory: Category | 'All';
  isMobile: boolean;
}

function Scene({ onHover, activeCategory, isMobile }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#FFF5E0" />
      <pointLight position={[-5, -3, -5]} intensity={0.2} color="#1E90FF" />

      <Stars radius={100} depth={80} count={isMobile ? 1500 : 3000} factor={4} saturation={0} fade speed={1.5} />

      <RotatingGroup>
        <GlobeSphere />
        {dataPoints.map((point) => (
          <DataPointMesh
            key={point.id}
            point={point}
            onHover={onHover}
            isFiltered={activeCategory === 'All' || point.category === activeCategory}
            isMobile={isMobile}
          />
        ))}
        {arcs.map((arc, i) => {
          const fromPt = dataPoints.find((p) => p.id === arc.from)!;
          const toPt = dataPoints.find((p) => p.id === arc.to)!;
          const showArc =
            activeCategory === 'All' ||
            fromPt.category === activeCategory ||
            toPt.category === activeCategory;
          return showArc ? (
            <ArcLine key={i} fromPoint={fromPt} toPoint={toPt} />
          ) : null;
        })}
      </RotatingGroup>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={isMobile ? 3.5 : 3}
        maxDistance={isMobile ? 7 : 8}
        rotateSpeed={isMobile ? 0.7 : 0.5}
        zoomSpeed={0.5}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_ROTATE,
        }}
      />
    </>
  );
}

interface GlobeProps {
  onHover: (point: DataPoint | null, screenPos: { x: number; y: number } | null) => void;
  activeCategory: Category | 'All';
  isMobile?: boolean;
}

export default function Globe({ onHover, activeCategory, isMobile = false }: GlobeProps) {
  // On mobile pull camera back slightly so the globe doesn't dominate the top half
  const cameraZ = isMobile ? 5.5 : 4.5;
  return (
    <Canvas
      camera={{ position: [0, 0, cameraZ], fov: 45 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene onHover={onHover} activeCategory={activeCategory} isMobile={isMobile} />
    </Canvas>
  );
}
