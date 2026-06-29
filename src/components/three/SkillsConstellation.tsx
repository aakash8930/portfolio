import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Line, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Read a CSS custom property from :root and return a `hsl(h s% l%)` string
 *  that Three.js's Color parser understands. */
function readCssVar(name: string, fallback = "189 94% 43%"): string {
  if (typeof window === "undefined") return `hsl(${fallback})`;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? `hsl(${v})` : `hsl(${fallback})`;
}

const PRIMARY = readCssVar("--primary");
const MUTED = readCssVar("--muted-foreground");
const BORDER = readCssVar("--border");

/** Distribute N points roughly evenly on a sphere using Fibonacci spiral. */
function fibonacciOnSphere(n: number, radius: number): THREE.Vector3[] {
  const phi = Math.PI * (3 - Math.sqrt(5));
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

type SkillNode = {
  label: string;
  position: THREE.Vector3;
  hovered: boolean;
};

function SkillNodeMesh({
  node,
  onHover,
  onUnhover,
  reducedMotion,
}: {
  node: SkillNode;
  onHover: () => void;
  onUnhover: () => void;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const target = node.hovered ? 1.18 : 1;
    ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, target, 6, 1 / 60);
    ref.current.scale.y = ref.current.scale.x;
    ref.current.scale.z = ref.current.scale.x;
    // Reduced motion: face camera always; otherwise look at camera handled by drei.
    if (reducedMotion) ref.current.lookAt(0, 0, 4);
  });

  return (
    <group
      ref={ref}
      position={node.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onUnhover();
        document.body.style.cursor = "";
      }}
    >
      {/* Center dot — rotates with the constellation. */}
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={PRIMARY} emissive={PRIMARY} emissiveIntensity={0.7} />
      </mesh>
      {/* Skill name — billboarded so it always faces the camera regardless
          of the parent group's rotation. This keeps labels readable while
          the sphere of dots keeps turning. */}
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, 0.18, 0]}
          fontSize={0.13}
          color={node.hovered ? PRIMARY : "hsl(220 18% 88%)"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.004}
          outlineColor="#0a0a0a"
          maxWidth={2}
        >
          {node.label}
        </Text>
      </Billboard>
    </group>
  );
}

function Scene({
  labels,
  reducedMotion,
}: {
  labels: string[];
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Position once, deterministic so labels don't jump on resize.
  const positions = useMemo(() => fibonacciOnSphere(labels.length, 2.2), [labels.length]);

  // Build edges connecting each node to its k nearest neighbors.
  const edges = useMemo(() => {
    const k = 2;
    const lines: { from: THREE.Vector3; to: THREE.Vector3; key: string }[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < positions.length; i++) {
      const dists = positions
        .map((p, j) => ({ idx: j, d: positions[i].distanceTo(p) }))
        .filter((d) => d.idx !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, k);
      for (const { idx } of dists) {
        const a = Math.min(i, idx);
        const b = Math.max(i, idx);
        const key = `${a}-${b}`;
        if (seen.has(key)) continue;
        seen.add(key);
        lines.push({ from: positions[a], to: positions[b], key });
      }
    }
    return lines;
  }, [positions]);

  // Slow auto-rotate group; pause when reduced motion is preferred.
  useFrame((_, dt) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.08;
    groupRef.current.rotation.x += dt * 0.02;
  });

  const nodes: SkillNode[] = positions.map((p, i) => ({
    label: labels[i],
    position: p,
    hovered: hoveredIdx === i,
  }));

  return (
    <group ref={groupRef}>
      {/* Connection lines. */}
      {edges.map((e) => (
        <Line
          key={e.key}
          points={[e.from, e.to]}
          color={BORDER}
          lineWidth={0.5}
          transparent
          opacity={0.35}
        />
      ))}
      {/* Skill nodes. */}
      {nodes.map((n, i) => (
        <SkillNodeMesh
          key={n.label}
          node={n}
          reducedMotion={reducedMotion}
          onHover={() => setHoveredIdx(i)}
          onUnhover={() => setHoveredIdx((cur) => (cur === i ? null : cur))}
        />
      ))}
      {/* Faint inner sphere hint (very subtle). */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color={MUTED} transparent opacity={0.04} wireframe />
      </mesh>
    </group>
  );
}

type Props = {
  /** Skill labels to distribute on the constellation. */
  labels: string[];
};

/** Drop-in 3D constellation for the skills section. */
const SkillsConstellation = ({ labels }: Props) => {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile) return null; // mobile uses existing grid fallback in parent

  return (
    <div className="w-full h-[520px] md:h-[600px]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={reducedMotion ? "never" : "always"}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -3, -2]} intensity={0.4} color={PRIMARY} />
        <Scene labels={labels} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};

export default SkillsConstellation;
