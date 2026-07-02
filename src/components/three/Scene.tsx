import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2400;
const SPHERE_RADIUS = 1.9;

// Bone white + amber, matching the CSS tokens.
const BASE_COLOR = new THREE.Color("#efe9e0");
const ACCENT_COLOR = new THREE.Color("#f6b355");

function fibonacciSphere(count: number, radius: number) {
  const pts = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts[i * 3] = Math.cos(theta) * r * radius;
    pts[i * 3 + 1] = y * radius;
    pts[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return pts;
}

function scatterField(count: number) {
  const pts = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pts[i * 3] = (Math.random() - 0.5) * 16;
    pts[i * 3 + 1] = (Math.random() - 0.5) * 9;
    pts[i * 3 + 2] = (Math.random() - 0.5) * 7;
  }
  return pts;
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);

function Particles({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const points = useRef<THREE.Points>(null!);
  const material = useRef<THREE.PointsMaterial>(null!);
  const wireframe = useRef<THREE.LineSegments>(null!);
  const { viewport, pointer } = useThree();

  const { positions, colors, sphere, scatter, phase } = useMemo(() => {
    const sphere = fibonacciSphere(COUNT, SPHERE_RADIUS);
    const scatter = scatterField(COUNT);
    const positions = sphere.slice();
    const colors = new Float32Array(COUNT * 3);
    const phase = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const c = Math.random() < 0.07 ? ACCENT_COLOR : BASE_COLOR;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      phase[i] = Math.random() * Math.PI * 2;
    }
    return { positions, colors, sphere, scatter, phase };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Scroll drives the sphere → starfield morph across the first viewport.
    const max = Math.max(1, window.innerHeight * 1.15);
    const t = smoothstep(Math.min(1, window.scrollY / max));

    const pos = points.current.geometry.attributes.position
      .array as Float32Array;
    const wobble = reducedMotion ? 0 : 0.035;
    for (let i = 0; i < COUNT; i++) {
      const j = i * 3;
      const w = Math.sin(time * 0.6 + phase[i]) * wobble;
      pos[j] = sphere[j] + (scatter[j] - sphere[j]) * t + w;
      pos[j + 1] = sphere[j + 1] + (scatter[j + 1] - sphere[j + 1]) * t + w;
      pos[j + 2] = sphere[j + 2] + (scatter[j + 2] - sphere[j + 2]) * t;
    }
    points.current.geometry.attributes.position.needsUpdate = true;

    // Particles dim as they disperse so text sections stay readable.
    material.current.opacity = 0.85 - t * 0.55;
    if (wireframe.current) {
      (wireframe.current.material as THREE.LineBasicMaterial).opacity =
        (viewport.aspect > 1.1 ? 0.1 : 0.055) * (1 - t);
      wireframe.current.rotation.y = -time * 0.06;
      wireframe.current.rotation.x = time * 0.03;
    }

    // Sphere sits right of the hero copy on wide screens, centered on mobile.
    const targetX = viewport.aspect > 1.1 ? viewport.width * 0.22 : 0;
    group.current.position.x += (targetX - group.current.position.x) * 0.05;

    if (!reducedMotion) {
      group.current.rotation.y = time * 0.05 + pointer.x * 0.18;
      group.current.rotation.x = -pointer.y * 0.12;
    }
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={material}
          size={0.02}
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={wireframe}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.15, 1)]} />
        <lineBasicMaterial
          color={ACCENT_COLOR}
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// Single fixed canvas behind the whole page. In the hero the particles form
// a slowly breathing sphere; scrolling disperses them into a dim ambient
// field that persists behind every section.
const Scene = () => {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Particles reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};

export default Scene;
