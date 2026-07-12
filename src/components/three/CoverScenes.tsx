import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

// 3D cover art for the two integration projects, which have no UI to screenshot.
// Each one is a sculpture of what the integration actually does, so the shape
// carries meaning rather than being ambient decoration:
//   hana    — packets streaming both ways between two databases
//   phonepe — a payment repeating on a loop around a mandate
//
// Deliberately not the hero's particle sphere: same palette, different form.

const AMBER = "#f6b355";
const BONE = "#efe9e0";
const COOL = "#7fb2f0";
const VIOLET = "#a887f5";
const MAGENTA = "#e879b9";

// A cover canvas is only mounted while its project row is expanded, so at most
// one of these exists at a time. Under reduced motion we render a single frame
// and stop, which still gives a composed 3D still.
function CoverCanvas({
  children,
  camera,
  reduced,
}: {
  children: React.ReactNode;
  camera: [number, number, number];
  reduced: boolean;
}) {
  return (
    <Canvas
      camera={{ position: camera, fov: 42 }}
      dpr={[1, 1.75]}
      frameloop={reduced ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      {children}
    </Canvas>
  );
}

/* ------------------------------- HANA ↔ Shipsgo ------------------------------ */

function DatabaseTower({
  x,
  color,
}: {
  x: number;
  color: string;
}) {
  return (
    <group position={[x, 0, 0]}>
      {[-0.26, 0, 0.26].map((y) => (
        <mesh key={y} position={[0, y, 0]} castShadow>
          <cylinderGeometry args={[0.52, 0.52, 0.2, 48]} />
          <meshStandardMaterial
            color={color}
            roughness={0.35}
            metalness={0.45}
            emissive={color}
            emissiveIntensity={0.18}
          />
        </mesh>
      ))}
    </group>
  );
}

const PACKETS_PER_LANE = 16;

// Packets ride a bezier arc between the two towers: amber outbound over the top,
// cool-blue inbound under the bottom. The two lanes are what make it read as a
// two-way sync rather than a one-way pipe.
function PacketLane({
  curve,
  color,
  speed,
  reduced,
}: {
  curve: THREE.QuadraticBezierCurve3;
  color: string;
  speed: number;
  reduced: boolean;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const time = reduced ? 0.35 : state.clock.elapsedTime;
    for (let i = 0; i < PACKETS_PER_LANE; i++) {
      const t = ((i / PACKETS_PER_LANE + time * speed) % 1 + 1) % 1;
      const p = curve.getPoint(t);
      dummy.position.copy(p);
      dummy.rotation.set(time * 1.2 + i, time * 0.8 + i, 0);
      // Packets swell mid-flight and shrink at the endpoints, so they appear to
      // leave one database and be absorbed by the other.
      const s = 0.05 + Math.sin(t * Math.PI) * 0.05;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, PACKETS_PER_LANE]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.9}
        roughness={0.3}
      />
    </instancedMesh>
  );
}

function HanaRig({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null!);

  const { out, back } = useMemo(
    () => ({
      out: new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-1.75, 0.2, 0),
        new THREE.Vector3(0, 1.5, 0),
        new THREE.Vector3(1.75, 0.2, 0)
      ),
      back: new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(1.75, -0.2, 0),
        new THREE.Vector3(0, -1.5, 0),
        new THREE.Vector3(-1.75, -0.2, 0)
      ),
    }),
    []
  );

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.22) * 0.34;
    group.current.rotation.x = -0.14 + Math.sin(t * 0.3) * 0.05;
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />
      <pointLight position={[-3, -1, 2]} intensity={26} color={COOL} distance={9} />
      <pointLight position={[3, 1, 2]} intensity={26} color={AMBER} distance={9} />
      <group ref={group} rotation={[-0.14, 0, 0]}>
        <DatabaseTower x={-1.75} color={AMBER} />
        <DatabaseTower x={1.75} color={COOL} />
        <PacketLane curve={out} color={AMBER} speed={0.16} reduced={reduced} />
        <PacketLane curve={back} color={COOL} speed={0.13} reduced={reduced} />
      </group>
    </>
  );
}

export function HanaCover() {
  const reduced = useReducedMotion();
  return (
    <CoverCanvas camera={[0, 0.3, 5.5]} reduced={reduced}>
      <HanaRig reduced={reduced} />
    </CoverCanvas>
  );
}

/* --------------------------------- PhonePe --------------------------------- */

const COINS = 14;

// Coins orbit the mandate card on a tilted ring — the loop is the whole point of
// autopay, so the recurrence is the form.
// The orbit is an ellipse standing up in the screen plane, tilted just enough
// that coins swing in front of the card at the top and duck behind it at the
// bottom. A flat horizontal ring collapses to a smear at this camera angle and
// stops reading as a loop — and the loop *is* the idea.
const RX = 2.75;
const RY = 1.85;
const TILT = 0.45;

function CoinRing({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const time = reduced ? 0.6 : state.clock.elapsedTime;
    for (let i = 0; i < COINS; i++) {
      const a = (i / COINS) * Math.PI * 2 + time * 0.34;
      dummy.position.set(
        Math.cos(a) * RX,
        Math.sin(a) * RY * Math.cos(TILT),
        Math.sin(a) * RY * Math.sin(TILT)
      );
      // Flat face toward the camera, spinning in-plane: the coins stay legible
      // as coins all the way around instead of thinning to edge-on slivers.
      dummy.rotation.set(Math.PI / 2, 0, time * 1.1 + i);
      // Nearer coins ride bigger, which sells the depth without a shadow pass.
      dummy.scale.setScalar(0.85 + Math.sin(a) * 0.15);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COINS]}>
      <cylinderGeometry args={[0.2, 0.2, 0.045, 32]} />
      <meshStandardMaterial
        color={AMBER}
        emissive={AMBER}
        emissiveIntensity={0.45}
        roughness={0.25}
        metalness={0.7}
      />
    </instancedMesh>
  );
}

function MandateCard({ reduced }: { reduced: boolean }) {
  const card = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    // Oscillate rather than spin: a full rotation would turn the card edge-on
    // and blank-side-out, and it has to read as a card at every frame.
    card.current.rotation.y = Math.sin(t * 0.4) * 0.55;
    card.current.position.y = Math.sin(t * 0.9) * 0.06;
  });

  return (
    <group ref={card}>
      <RoundedBox args={[2.2, 1.38, 0.08]} radius={0.09} smoothness={4}>
        <meshStandardMaterial
          color="#3a2266"
          roughness={0.28}
          metalness={0.55}
          emissive={VIOLET}
          emissiveIntensity={0.14}
        />
      </RoundedBox>
      {/* Magnetic stripe + chip: the two details that make a rounded box read
          unmistakably as a payment card at a glance. */}
      <mesh position={[0, 0.38, 0.045]}>
        <boxGeometry args={[2.2, 0.24, 0.01]} />
        <meshStandardMaterial color={MAGENTA} emissive={MAGENTA} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-0.72, -0.14, 0.045]}>
        <boxGeometry args={[0.36, 0.28, 0.01]} />
        <meshStandardMaterial
          color={AMBER}
          emissive={AMBER}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function PhonePeRig({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (reduced) return;
    // Only a gentle sway — the orbit must stay square to the camera to read.
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.2) * 0.09;
    group.current.rotation.x = Math.sin(t * 0.25) * 0.04;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 4]} intensity={1.3} />
      <pointLight position={[-3, 1, 3]} intensity={30} color={VIOLET} distance={11} />
      <pointLight position={[3, -2, 2]} intensity={26} color={MAGENTA} distance={11} />
      <pointLight position={[0, 3, -3]} intensity={18} color={BONE} distance={11} />
      <group ref={group}>
        <MandateCard reduced={reduced} />
        <CoinRing reduced={reduced} />
      </group>
    </>
  );
}

export function PhonePeCover() {
  const reduced = useReducedMotion();
  return (
    <CoverCanvas camera={[0, 0, 6.4]} reduced={reduced}>
      <PhonePeRig reduced={reduced} />
    </CoverCanvas>
  );
}
