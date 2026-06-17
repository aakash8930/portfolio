import { cn } from "@/lib/utils";

type Variant = "resonate" | "aura" | "ultracore" | "hana" | "phonepe" | "makhana";

type CoverArtProps = {
  variant: Variant;
  className?: string;
};

// Per-project cover art. Stylized SVG, not screenshots.
// Each variant picks a distinct color treatment so project categories
// are visually distinguishable at a glance.
export function CoverArt({ variant, className }: CoverArtProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border",
        className
      )}
    >
      {variant === "resonate" && <Resonate />}
      {variant === "aura" && <Aura />}
      {variant === "ultracore" && <Ultracore />}
      {variant === "hana" && <HanaShipsgo />}
      {variant === "phonepe" && <PhonePe />}
      {variant === "makhana" && <Makhana />}
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

function HanaShipsgo() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, hsl(35 80% 30%) 0%, hsl(220 30% 18%) 100%)",
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="h-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="hsl(35 90% 60%)" />
            <stop offset="1" stopColor="hsl(200 90% 55%)" />
          </linearGradient>
        </defs>
        {/* Two nodes with bidirectional arrows */}
        <g>
          <rect x="40" y="85" width="90" height="55" rx="6" fill="hsl(35 80% 45%)" opacity="0.85" />
          <text x="85" y="118" textAnchor="middle" fill="white" fontSize="14" fontFamily="ui-sans-serif, system-ui" fontWeight="600">
            HANA
          </text>
          <rect x="270" y="85" width="90" height="55" rx="6" fill="hsl(200 80% 50%)" opacity="0.85" />
          <text x="315" y="118" textAnchor="middle" fill="white" fontSize="13" fontFamily="ui-sans-serif, system-ui" fontWeight="600">
            Shipsgo
          </text>
          {/* Bidirectional arrow */}
          <line x1="135" y1="105" x2="265" y2="105" stroke="url(#h-grad)" strokeWidth="2" markerEnd="url(#arrow)" markerStart="url(#arrow-rev)" />
          <line x1="135" y1="125" x2="265" y2="125" stroke="url(#h-grad)" strokeWidth="2" markerEnd="url(#arrow)" markerStart="url(#arrow-rev)" />
        </g>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(200 90% 60%)" />
          </marker>
          <marker id="arrow-rev" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 10 0 L 0 5 L 10 10 z" fill="hsl(35 90% 60%)" />
          </marker>
        </defs>
        <text x="200" y="180" textAnchor="middle" fill="hsl(35 30% 80%)" fontSize="11" fontFamily="ui-monospace, monospace" opacity="0.7">
          mail · db sync · tracking
        </text>
      </svg>
    </div>
  );
}

function Makhana() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(at 30% 30%, hsl(140 50% 45% / 0.45), transparent 60%), radial-gradient(at 80% 80%, hsl(45 70% 50% / 0.35), transparent 60%), hsl(150 30% 10%)",
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="m-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="hsl(140 60% 65%)" />
            <stop offset="1" stopColor="hsl(45 80% 60%)" />
          </linearGradient>
        </defs>
        {/* Makhana (fox nut) puffs scattered */}
        {[
          { x: 80, y: 70, r: 14 },
          { x: 130, y: 110, r: 18 },
          { x: 195, y: 80, r: 16 },
          { x: 250, y: 130, r: 20 },
          { x: 310, y: 95, r: 14 },
          { x: 105, y: 160, r: 12 },
          { x: 175, y: 165, r: 15 },
          { x: 280, y: 170, r: 13 },
        ].map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r={c.r} fill="url(#m-grad)" opacity={0.85 - i * 0.04} />
            <circle cx={c.x - c.r * 0.25} cy={c.y - c.r * 0.25} r={c.r * 0.3} fill="hsl(45 90% 85%)" opacity="0.5" />
          </g>
        ))}
        {/* Leaf accent */}
        <path
          d="M 340 40 Q 360 60 350 90 Q 330 80 340 40 Z"
          fill="hsl(140 70% 55%)"
          opacity="0.7"
        />
        <text x="200" y="200" textAnchor="middle" fill="hsl(140 30% 80%)" fontSize="11" fontFamily="ui-monospace, monospace" opacity="0.7">
          healthy snack · ecommerce
        </text>
      </svg>
    </div>
  );
}

function PhonePe() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(at 50% 50%, hsl(280 70% 35%) 0%, hsl(260 60% 15%) 100%)",
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="p-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="hsl(320 80% 65%)" />
            <stop offset="1" stopColor="hsl(280 70% 55%)" />
          </linearGradient>
        </defs>
        {/* Mandate / recurring card */}
        <g transform="translate(80, 50)">
          <rect x="0" y="0" width="240" height="125" rx="14" fill="hsl(280 50% 22%)" stroke="url(#p-grad)" strokeWidth="2" />
          <text x="20" y="32" fill="hsl(320 80% 75%)" fontSize="11" fontFamily="ui-monospace, monospace" opacity="0.8">
            AUTOPAY MANDATE
          </text>
          <text x="20" y="65" fill="hsl(0 0% 100%)" fontSize="22" fontFamily="ui-sans-serif, system-ui" fontWeight="700">
            ₹ 1,499
          </text>
          <text x="20" y="85" fill="hsl(320 30% 80%)" fontSize="11" fontFamily="ui-monospace, monospace" opacity="0.7">
            every month · next debit
          </text>
          {/* Recurring arrows */}
          <g transform="translate(180, 95)">
            <path d="M 0 0 A 12 12 0 1 1 12 -12" fill="none" stroke="url(#p-grad)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 12 -16 L 14 -10 L 8 -12 z" fill="hsl(320 80% 70%)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
