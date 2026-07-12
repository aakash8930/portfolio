import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "resonate"
  | "aura"
  | "ultracore"
  | "hana"
  | "phonepe"
  | "makhana"
  | "vanam"
  | "school"
  | "dapigo";

type CoverArtProps = {
  variant: Variant;
  className?: string;
};

// three.js only ships to visitors who actually open one of the 3D covers.
const HanaCover = lazy(() =>
  import("./three/CoverScenes").then((m) => ({ default: m.HanaCover }))
);
const PhonePeCover = lazy(() =>
  import("./three/CoverScenes").then((m) => ({ default: m.PhonePeCover }))
);

// Per-project cover art, in three flavors:
//   - shipped products with a UI      → a real screenshot
//   - integrations with no UI to show → a live 3D scene of what they do
//   - the rest                        → stylized SVG
const SHOTS: Partial<Record<Variant, { src: string; alt: string }>> = {
  makhana: { src: "/covers/makhana.webp", alt: "Makhana Health King storefront" },
  vanam: { src: "/covers/vanam.webp", alt: "Vanam furniture storefront with a 3D hero" },
  school: { src: "/covers/school.webp", alt: "AVAASchool admin dashboard" },
  dapigo: { src: "/covers/dapigo.webp", alt: "DapiGO customer storefront" },
};

export function CoverArt({ variant, className }: CoverArtProps) {
  const shot = SHOTS[variant];

  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border",
        className
      )}
    >
      {shot ? (
        <img
          src={shot.src}
          alt={shot.alt}
          loading="lazy"
          decoding="async"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0">
          {variant === "resonate" && <Resonate />}
          {variant === "aura" && <Aura />}
          {variant === "ultracore" && <Ultracore />}
          {variant === "hana" && <Scene3D variant="hana" />}
          {variant === "phonepe" && <Scene3D variant="phonepe" />}
        </div>
      )}
    </div>
  );
}

// The gradient is a real backdrop, not a placeholder: the canvas is alpha and
// renders on top of it. It also stands in on its own if WebGL never comes up.
const SCENE_BACKDROP: Record<"hana" | "phonepe", string> = {
  hana: "linear-gradient(135deg, hsl(35 80% 30%) 0%, hsl(220 30% 14%) 55%, hsl(210 45% 20%) 100%)",
  phonepe:
    "radial-gradient(at 50% 45%, hsl(280 70% 32%) 0%, hsl(265 60% 16%) 55%, hsl(260 55% 10%) 100%)",
};

function Scene3D({ variant }: { variant: "hana" | "phonepe" }) {
  return (
    <div className="absolute inset-0" style={{ background: SCENE_BACKDROP[variant] }}>
      <Suspense fallback={null}>
        {variant === "hana" ? <HanaCover /> : <PhonePeCover />}
      </Suspense>
    </div>
  );
}

function Resonate() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(at 30% 30%, hsl(189 94% 43% / 0.4), transparent 60%), radial-gradient(at 80% 70%, hsl(217 91% 60% / 0.35), transparent 60%), hsl(220 26% 8%)",
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="r-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="hsl(189 94% 60%)" />
            <stop offset="1" stopColor="hsl(217 91% 65%)" />
          </linearGradient>
        </defs>
        {/* Equalizer bars */}
        {[40, 70, 50, 90, 60, 110, 75, 95, 55, 80, 65, 100].map((h, i) => (
          <rect
            key={i}
            x={30 + i * 30}
            y={(225 - h) / 2}
            width="14"
            height={h}
            rx="3"
            fill="url(#r-grad)"
            opacity={0.5 + (i % 4) * 0.12}
          />
        ))}
        {/* Sync dot */}
        <circle cx="200" cy="112" r="8" fill="hsl(189 94% 70%)">
          <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function Aura() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(at 70% 30%, hsl(280 70% 55% / 0.4), transparent 60%), radial-gradient(at 20% 80%, hsl(330 80% 55% / 0.3), transparent 60%), hsl(260 30% 12%)",
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="a-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="hsl(280 70% 65%)" />
            <stop offset="1" stopColor="hsl(330 80% 65%)" />
          </linearGradient>
        </defs>
        {/* Cart + tag */}
        <g transform="translate(140, 60)">
          <rect x="0" y="20" width="120" height="70" rx="8" fill="none" stroke="url(#a-grad)" strokeWidth="2.5" />
          <path d="M 10 30 L 30 0 L 100 0 L 120 30" fill="none" stroke="url(#a-grad)" strokeWidth="2.5" />
          <circle cx="35" cy="105" r="8" fill="hsl(280 70% 65%)" />
          <circle cx="85" cy="105" r="8" fill="hsl(330 80% 65%)" />
        </g>
        <text x="200" y="190" textAnchor="middle" fill="hsl(280 30% 80%)" fontSize="14" fontFamily="ui-monospace, monospace" opacity="0.6">
          storefront · admin · api
        </text>
      </svg>
    </div>
  );
}

function Ultracore() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, hsl(28 60% 35%) 0%, hsl(20 70% 25%) 50%, hsl(15 80% 18%) 100%)",
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="w-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="hsl(35 80% 65%)" />
            <stop offset="1" stopColor="hsl(20 60% 50%)" />
          </linearGradient>
        </defs>
        {/* Wood plank stack */}
        <g>
          <rect x="60" y="60" width="280" height="22" rx="4" fill="url(#w-grad)" opacity="0.9" />
          <rect x="60" y="90" width="280" height="22" rx="4" fill="url(#w-grad)" opacity="0.75" />
          <rect x="60" y="120" width="280" height="22" rx="4" fill="url(#w-grad)" opacity="0.6" />
          <rect x="60" y="150" width="280" height="22" rx="4" fill="url(#w-grad)" opacity="0.45" />
          {/* Grain lines */}
          {[60, 90, 120, 150].map((y, i) => (
            <g key={i}>
              <line x1="80" y1={y + 11} x2="200" y2={y + 11} stroke="hsl(20 60% 30%)" strokeWidth="0.6" opacity="0.5" />
              <line x1="220" y1={y + 11} x2="320" y2={y + 11} stroke="hsl(20 60% 30%)" strokeWidth="0.6" opacity="0.5" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}



