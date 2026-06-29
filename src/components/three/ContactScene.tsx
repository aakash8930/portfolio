import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
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
const ACCENT = readCssVar("--accent", "217 91% 60%");

function Shape({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const target = useRef(new THREE.Vector2(0, 0));
  const current = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      // Only react when cursor is in the bottom half of the page — feels lighter
      // than full-page tracking that's already owned by HeroScene.
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      target.current.set(x * 0.4, y * 0.4);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    if (reducedMotion) return;
    current.current.x = THREE.MathUtils.damp(current.current.x, target.current.x, 4, dt);
    current.current.y = THREE.MathUtils.damp(current.current.y, target.current.y, 4, dt);
    meshRef.current.rotation.x += dt * 0.3;
    meshRef.current.rotation.y += dt * 0.45;
    meshRef.current.rotation.z = -current.current.x * 0.25;
    meshRef.current.rotation.x += current.current.y * 0.2;
  });

  // Position the torus knot off to the right side of the contact section so
  // it doesn't compete with the centered text. Visible but not blocking.
  return (
    <mesh ref={meshRef} position={[2.2, -0.3, 0]} scale={0.9}>
      <torusKnotGeometry args={[0.9, 0.32, 160, 24, 2, 3]} />
      <MeshDistortMaterial
        color={PRIMARY}
        emissive={ACCENT}
        emissiveIntensity={0.35}
        metalness={0.55}
        roughness={0.2}
        distort={0.22}
        speed={1.4}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

const ContactScene = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={reducedMotion ? "never" : "always"}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 4, 6]} intensity={0.9} />
        <pointLight position={[-3, -2, -3]} intensity={0.5} color={ACCENT} />
        <Shape reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};

export default ContactScene;
