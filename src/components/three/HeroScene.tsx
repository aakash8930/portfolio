import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Read a CSS custom property and return a `hsl(h s% l%)` string for three.js. */
function readCssVar(name: string, fallback = "189 94% 43%"): string {
  if (typeof window === "undefined") return `hsl(${fallback})`;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? `hsl(${v})` : `hsl(${fallback})`;
}

const PRIMARY = readCssVar("--primary");
const ACCENT = readCssVar("--accent", "217 91% 60%");
const HOT = "hsl(20 100% 60%)"; // warm core color, fixed — feels like a reactor

/** Reusable torus ring with a thin emissive look. */
function Ring({
  radius,
  thickness = 0.04,
  speed,
  axis = "y",
  tilt = 0,
}: {
  radius: number;
  thickness?: number;
  speed: number;
  axis?: "x" | "y" | "z";
  tilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    if (axis === "y") ref.current.rotation.y += dt * speed;
    if (axis === "x") ref.current.rotation.x += dt * speed;
    if (axis === "z") ref.current.rotation.z += dt * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, tilt * 0.6]}>
      <torusGeometry args={[radius, thickness, 16, 128]} />
      <meshStandardMaterial
        color={PRIMARY}
        emissive={PRIMARY}
        emissiveIntensity={1.4}
        metalness={0.6}
        roughness={0.25}
      />
    </mesh>
  );
}

/** Eight short radial spokes (the "arms" of the reactor frame). */
function Spokes() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.z += dt * 0.2;
  });
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const r1 = 1.25;
      const r2 = 2.0;
      const from = new THREE.Vector3(Math.cos(a) * r1, Math.sin(a) * r1, 0);
      const to = new THREE.Vector3(Math.cos(a) * r2, Math.sin(a) * r2, 0);
      arr.push({ from, to, key: i });
    }
    return arr;
  }, []);
  return (
    <group ref={groupRef}>
      {items.map((s) => {
        const mid = s.from.clone().add(s.to).multiplyScalar(0.5);
        const dir = s.to.clone().sub(s.from);
        const length = dir.length();
        const angle = Math.atan2(dir.y, dir.x);
        return (
          <mesh key={s.key} position={mid} rotation={[0, 0, angle]}>
            <boxGeometry args={[length, 0.025, 0.025]} />
            <meshStandardMaterial
              color={PRIMARY}
              emissive={PRIMARY}
              emissiveIntensity={1.1}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/** Pulsing central core — bright, hot, breathing. */
function Core() {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 2.5) * 0.08;
    ref.current.scale.setScalar(pulse);
    if (matRef.current) {
      matRef.current.opacity = 0.85 + Math.sin(t * 2.5) * 0.1;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.55, 32, 32]} />
      <meshBasicMaterial ref={matRef} color={HOT} transparent opacity={0.9} toneMapped={false} />
    </mesh>
  );
}

/** Glow halo around the core — billboarded. */
function Halo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.scale.setScalar(1 + Math.sin(t * 2.5) * 0.05);
  });
  return (
    <mesh>
      <sphereGeometry args={[0.95, 32, 32]} />
      <meshBasicMaterial
        color={HOT}
        transparent
        opacity={0.18}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}

/** Outer spinning arc segment — looks like a partial energy ring. */
function EnergyArc({ startAngle, arc }: { startAngle: number; arc: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.35;
  });
  return (
    <group ref={ref} rotation={[0, 0, startAngle]}>
      <mesh>
        <torusGeometry args={[2.6, 0.025, 8, 64, arc]} />
        <meshBasicMaterial color={ACCENT} toneMapped={false} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

/** Sparks — small emissive points flying outward, looping. */
function Sparks({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const angles = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.3 + Math.random() * 1.6;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = Math.sin(a) * r;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      speeds[i] = 0.4 + Math.random() * 0.8;
      angles[i] = a;
    }
    return { positions, speeds, angles };
  }, [count]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const x = arr[idx];
      const y = arr[idx + 1];
      const r = Math.sqrt(x * x + y * y);
      const newR = r + dt * data.speeds[i] * 0.6;
      if (newR > 3.2) {
        // respawn at the inner ring
        const a = data.angles[i] + dt * 2;
        const startR = 1.3;
        arr[idx] = Math.cos(a) * startR;
        arr[idx + 1] = Math.sin(a) * startR;
      } else {
        arr[idx] = (x / r) * newR;
        arr[idx + 1] = (y / r) * newR;
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={HOT}
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

/** Whole assembly — tilts slightly toward the cursor for the "tracking" feel. */
function Repulsor({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector2(0, 0));
  const current = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    if (reducedMotion || !groupRef.current) return;
    current.current.x = THREE.MathUtils.damp(current.current.x, target.current.x, 3, dt);
    current.current.y = THREE.MathUtils.damp(current.current.y, target.current.y, 3, dt);
    groupRef.current.rotation.y = current.current.x * 0.25;
    groupRef.current.rotation.x = current.current.y * 0.18;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Core + halo stack. */}
      <Halo />
      <Core />
      {/* Three concentric rings spinning in opposite directions on different axes. */}
      <Ring radius={1.25} thickness={0.045} speed={0.6} axis="y" />
      <Ring radius={1.6} thickness={0.035} speed={-0.9} axis="x" tilt={0.4} />
      <Ring radius={1.95} thickness={0.028} speed={0.5} axis="z" tilt={-0.3} />
      {/* Spokes — slowly rotating. */}
      <Spokes />
      {/* Outer energy arcs. */}
      <EnergyArc startAngle={0} arc={Math.PI * 0.55} />
      <EnergyArc startAngle={Math.PI} arc={Math.PI * 0.45} />
      {/* Sparks. */}
      <Sparks count={70} />
    </group>
  );
}

function ThemeSync() {
  const { invalidate } = useThree();
  useEffect(() => {
    const obs = new MutationObserver(() => invalidate());
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [invalidate]);
  return null;
}

const HeroScene = () => {
  const reducedMotion = useReducedMotion();
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={reducedMotion ? "never" : "always"}
      >
        <ThemeSync />
        <ambientLight intensity={0.35} />
        <pointLight position={[0, 0, 3]} intensity={2.5} color={HOT} distance={8} decay={1.4} />
        <pointLight position={[4, 3, 4]} intensity={0.6} color={PRIMARY} />
        <Repulsor reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};

export default HeroScene;