"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Animal {
  id: string;
  name: string;
  tag: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isEscaping: boolean;
  breached: boolean;
  battery: number;
  heartRate: number;
  color: string;
}

interface Alert {
  id: string;
  animalName: string;
  tag: string;
  time: string;
  message: string;
  severity: "critical" | "warning";
}

// ── SVG viewport dimensions ────────────────────────────────────────────────
const SVG_W = 600;
const SVG_H = 380;

// ── Virtual fence polygon (SVG coords) ────────────────────────────────────
const FENCE: [number, number][] = [
  [110, 70],
  [490, 60],
  [510, 300],
  [100, 310],
];

// ── Helpers ───────────────────────────────────────────────────────────────
function fencePolygonStr(pts: [number, number][]) {
  return pts.map(([x, y]) => `${x},${y}`).join(" ");
}

function pointInPolygon(x: number, y: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function fenceCenter(poly: [number, number][]): [number, number] {
  const cx = poly.reduce((s, [x]) => s + x, 0) / poly.length;
  const cy = poly.reduce((s, [, y]) => s + y, 0) / poly.length;
  return [cx, cy];
}

function now() {
  return new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

// ── Initial animals ───────────────────────────────────────────────────────
const ANIMAL_COLORS = ["#16a34a", "#15803d", "#166534", "#14532d", "#4ade80", "#86efac", "#bbf7d0"];

function makeAnimals(): Animal[] {
  const [cx, cy] = fenceCenter(FENCE);
  const spread = 60;
  const base: Omit<Animal, "id" | "name" | "tag" | "x" | "y" | "color" | "isEscaping" | "breached">[] = [
    { vx: 0.12, vy: 0.08, battery: 87, heartRate: 62 },
    { vx: -0.1, vy: 0.15, battery: 92, heartRate: 58 },
    { vx: 0.08, vy: -0.12, battery: 74, heartRate: 65 },
    { vx: -0.14, vy: -0.09, battery: 95, heartRate: 60 },
    { vx: 0.11, vy: 0.06, battery: 81, heartRate: 63 },
    { vx: -0.07, vy: 0.13, battery: 68, heartRate: 70 },
    { vx: 0.09, vy: -0.07, battery: 99, heartRate: 57 },
  ];

  const names = ["Maravilla", "Estrella", "Luna", "Pinta", "Canela", "Trigueña", "Nube"];
  const tags = ["CL-001", "CL-002", "CL-003", "CL-004", "CL-005", "CL-006", "CL-007"];

  return base.map((b, i) => ({
    ...b,
    id: `a${i}`,
    name: names[i],
    tag: tags[i],
    x: cx + (i % 3 - 1) * spread + Math.sin(i * 1.4) * 20,
    y: cy + (Math.floor(i / 3) - 1) * spread + Math.cos(i * 1.4) * 20,
    isEscaping: i === 6,
    breached: false,
    color: ANIMAL_COLORS[i],
  }));
}

// ── Guided steps ──────────────────────────────────────────────────────────
const GUIDE_STEPS = [
  {
    phase: "idle" as const,
    title: "Bienvenido al predio Los Boldos",
    body: "Son las 3:00 AM. Tienes 7 vacas en el Potrero Norte con collares Floq. No necesitas salir a revisar — el sistema monitorea todo por ti.",
    cta: "▶ Iniciar simulación",
  },
  {
    phase: "grazing" as const,
    title: "Hato en calma",
    body: "Todos los animales están dentro del cerco virtual. Floq te avisa solo si algo cambia. Puedes dormir tranquilo.",
    cta: null,
  },
  {
    phase: "alert" as const,
    title: "¡Alerta automática!",
    body: "Nube (CL-007) cruzó el límite. Floq envió una notificación a tu teléfono al instante — sin necesidad de recorridos nocturnos.",
    cta: null,
  },
  {
    phase: "done" as const,
    title: "Sin cercas físicas. Sin recorridos.",
    body: "Con Floq instalas el cerco desde tu celular en minutos y recibes alertas en tiempo real. Ahorra tiempo y protege tu inversión.",
    cta: "↺ Ver de nuevo",
  },
];

// ── Component ─────────────────────────────────────────────────────────────
export default function DemoApp() {
  const [animals, setAnimals] = useState<Animal[]>(makeAnimals);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [playing, setPlaying] = useState(false);
  const [tick, setTick] = useState(0);
  const [demoPhase, setDemoPhase] = useState<"idle" | "grazing" | "alert" | "done">("idle");
  const alertedIds = useRef(new Set<string>());
  const tickRef = useRef(0);

  const reset = useCallback(() => {
    setAnimals(makeAnimals());
    setAlerts([]);
    setPlaying(false);
    setDemoPhase("idle");
    setTick(0);
    tickRef.current = 0;
    alertedIds.current = new Set();
  }, []);

  useEffect(() => {
    if (!playing) return;

    const id = setInterval(() => {
      tickRef.current += 1;
      const t = tickRef.current;
      setTick(t);

      if (t === 1) setDemoPhase("grazing");

      setAnimals((prev) => {
        const next = prev.map((a) => {
          let { x, y, vx, vy } = a;

          if (a.isEscaping) {
            const escapeSpeed = t > 80 ? 1.8 : t > 50 ? 0.9 : 0.3;
            x += escapeSpeed;
            y += 0.1 * Math.sin(t * 0.05);
          } else {
            x += vx + Math.sin(t * 0.03 + parseInt(a.id.slice(1)) * 1.1) * 0.4;
            y += vy + Math.cos(t * 0.03 + parseInt(a.id.slice(1)) * 1.3) * 0.4;

            const [cx, cy] = fenceCenter(FENCE);
            const dx = x - cx, dy = y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 90) {
              x -= dx * 0.04;
              y -= dy * 0.04;
              vx = -vx * 0.8;
              vy = -vy * 0.8;
            }
          }

          const inside = pointInPolygon(x, y, FENCE);
          const breached = !inside;
          return { ...a, x, y, vx, vy, breached };
        });

        next.forEach((a) => {
          if (a.breached && !alertedIds.current.has(a.id)) {
            alertedIds.current.add(a.id);
            setAlerts((prev) => [
              {
                id: `alert-${a.id}-${Date.now()}`,
                animalName: a.name,
                tag: a.tag,
                time: now(),
                message: `${a.name} (${a.tag}) salió del cerco virtual`,
                severity: "critical",
              },
              ...prev,
            ]);
            setDemoPhase("alert");
          }
        });

        return next;
      });

      if (t >= 200) {
        setPlaying(false);
        setDemoPhase("done");
      }
    }, 60);

    return () => clearInterval(id);
  }, [playing]);

  const breachedCount = animals.filter((a) => a.breached).length;
  const insideCount = animals.length - breachedCount;
  const avgBattery = Math.round(animals.reduce((s, a) => s + a.battery, 0) / animals.length);

  const guide = GUIDE_STEPS.find((s) => s.phase === demoPhase) ?? GUIDE_STEPS[0];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/demo" className="text-gray-500 hover:text-gray-300 text-sm transition-colors mr-1">
            ← Demos
          </Link>
          <div className="w-px h-4 bg-gray-700" />
          <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center font-bold text-xs text-white">
            F
          </div>
          <span className="font-semibold text-white text-sm">Floq</span>
          <span className="text-gray-500 text-sm">— Demo para ganaderos</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
          Simulación en vivo · Predio Los Boldos · Chile
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Map */}
        <div className="flex-1 flex flex-col">
          {/* Guide banner */}
          <div
            className={`px-5 py-4 border-b transition-colors ${
              demoPhase === "alert"
                ? "bg-red-950/60 border-red-800/60"
                : "bg-gray-900 border-gray-800"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold mb-0.5 ${
                    demoPhase === "alert" ? "text-red-300" : "text-white"
                  }`}
                >
                  {guide.title}
                </p>
                <p className="text-xs text-gray-400">{guide.body}</p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2">
                {demoPhase === "idle" && (
                  <button
                    onClick={() => setPlaying(true)}
                    className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm rounded-md font-medium transition-colors whitespace-nowrap"
                  >
                    ▶ Iniciar Demo
                  </button>
                )}
                {(demoPhase === "grazing" || demoPhase === "alert") && (
                  <button
                    onClick={() => setPlaying((p) => !p)}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md font-medium transition-colors"
                  >
                    {playing ? "⏸" : "▶"}
                  </button>
                )}
                {demoPhase === "done" && (
                  <button
                    onClick={reset}
                    className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm rounded-md font-medium transition-colors"
                  >
                    ↺ Ver de nuevo
                  </button>
                )}
                {demoPhase === "alert" && (
                  <button
                    onClick={reset}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md transition-colors"
                  >
                    ↺
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* SVG Map */}
          <div className="flex-1 bg-gray-900 flex items-center justify-center p-4">
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="w-full max-w-2xl rounded-xl border border-gray-700 bg-[#1a2e1a]"
              style={{ aspectRatio: `${SVG_W}/${SVG_H}` }}
            >
              <defs>
                <pattern id="grass" patternUnits="userSpaceOnUse" width="20" height="20">
                  <rect width="20" height="20" fill="#1a2e1a" />
                  <line x1="0" y1="10" x2="20" y2="10" stroke="#1f3620" strokeWidth="0.5" />
                  <line x1="10" y1="0" x2="10" y2="20" stroke="#1f3620" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="alertGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width={SVG_W} height={SVG_H} fill="url(#grass)" />

              <polygon
                points={fencePolygonStr(FENCE)}
                fill="#22c55e"
                fillOpacity="0.08"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="8 4"
              />

              {FENCE.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={5} fill="#22c55e" fillOpacity="0.7" />
              ))}

              <text x={fenceCenter(FENCE)[0]} y={75} textAnchor="middle" fill="#4ade80" fontSize="11" opacity="0.7">
                Cerco Virtual · Potrero Norte
              </text>

              {alerts.length > 0 && (
                <circle
                  cx={animals.find((a) => a.breached)?.x ?? SVG_W / 2}
                  cy={animals.find((a) => a.breached)?.y ?? SVG_H / 2}
                  r="40"
                  fill="url(#alertGlow)"
                  className="animate-ping"
                  style={{ transformOrigin: "center", animationDuration: "1s" }}
                />
              )}

              {animals.map((animal) => (
                <g key={animal.id}>
                  <ellipse cx={animal.x} cy={animal.y + 10} rx={8} ry={4} fill="black" fillOpacity="0.2" />
                  <circle
                    cx={animal.x}
                    cy={animal.y}
                    r={animal.breached ? 9 : 7}
                    fill={animal.breached ? "#ef4444" : animal.color}
                    stroke={animal.breached ? "#fca5a5" : "white"}
                    strokeWidth={animal.breached ? 2 : 1}
                    style={{ transition: "r 0.3s, fill 0.3s" }}
                  />
                  {animal.isEscaping && (
                    <text
                      x={animal.x}
                      y={animal.y - 13}
                      textAnchor="middle"
                      fill={animal.breached ? "#fca5a5" : "#fde68a"}
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {animal.name}
                    </text>
                  )}
                </g>
              ))}

              <g transform="translate(560, 340)">
                <circle r="18" fill="black" fillOpacity="0.5" />
                <text textAnchor="middle" y="-8" fill="white" fontSize="9">N</text>
                <line x1="0" y1="-14" x2="0" y2="-6" stroke="white" strokeWidth="1.5" />
              </g>

              <g transform="translate(30, 355)">
                <line x1="0" y1="0" x2="60" y2="0" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="0" y1="-4" x2="0" y2="4" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="60" y1="-4" x2="60" y2="4" stroke="#9ca3af" strokeWidth="1.5" />
                <text x="30" y="-7" textAnchor="middle" fill="#9ca3af" fontSize="9">200 m</text>
              </g>
            </svg>
          </div>

          {/* Step progress */}
          <div className="px-5 py-3 bg-gray-900 border-t border-gray-800 flex items-center gap-3">
            {(["idle", "grazing", "alert", "done"] as const).map((phase, i) => (
              <div key={phase} className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    demoPhase === phase
                      ? phase === "alert"
                        ? "bg-red-400 animate-pulse"
                        : "bg-green-400"
                      : ["idle", "grazing", "alert", "done"].indexOf(demoPhase) > i
                      ? "bg-green-700"
                      : "bg-gray-700"
                  }`}
                />
                {i < 3 && <div className="w-6 h-px bg-gray-700" />}
              </div>
            ))}
            <span className="ml-2 text-xs text-gray-500">
              {demoPhase === "idle" && "Paso 1 de 4: Estado inicial"}
              {demoPhase === "grazing" && "Paso 2 de 4: Monitoreo en reposo"}
              {demoPhase === "alert" && "Paso 3 de 4: Alerta detectada"}
              {demoPhase === "done" && "Paso 4 de 4: Demo completo"}
            </span>
            <div className="ml-auto">
              <a
                href="/#waitlist"
                className="text-xs text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Solicitar acceso →
              </a>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-72 flex flex-col border-l border-gray-800 bg-gray-900">
          {/* Stats */}
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Resumen del hato
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <StatCard label="Dentro" value={insideCount} color="green" unit="/ 7" />
              <StatCard label="Fuera" value={breachedCount} color={breachedCount > 0 ? "red" : "gray"} unit="" />
              <StatCard label="Batería" value={avgBattery} color="blue" unit="%" />
              <StatCard label="Collares" value={animals.length} color="purple" unit="" />
            </div>
          </div>

          {/* Animal list */}
          <div className="p-4 border-b border-gray-800 flex-1 overflow-y-auto">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Estado individual
            </h2>
            <div className="space-y-1.5">
              {animals.map((a) => (
                <div
                  key={a.id}
                  className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                    a.breached ? "bg-red-900/40 border border-red-700/50" : "bg-gray-800/50"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: a.breached ? "#ef4444" : a.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm font-medium truncate block ${a.breached ? "text-red-300" : "text-white"}`}>
                      {a.name} {a.breached && "⚠"}
                    </span>
                    <span className="text-gray-500 text-xs">{a.tag}</span>
                  </div>
                  <div className="text-right flex-shrink-0 text-xs text-gray-500">
                    🔋{a.battery}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="p-4" style={{ maxHeight: "220px" }}>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              Alertas
              {alerts.length > 0 && (
                <span className="px-1.5 py-0.5 bg-red-600 text-white text-xs rounded-full">{alerts.length}</span>
              )}
            </h2>
            {alerts.length === 0 ? (
              <div className="text-gray-600 text-xs text-center py-3">Sin alertas activas</div>
            ) : (
              <div className="space-y-2 overflow-y-auto">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-2 rounded-lg bg-red-900/30 border border-red-700/50">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      <span className="text-red-300 text-xs font-semibold">CERCO VULNERADO</span>
                      <span className="ml-auto text-gray-500 text-xs">{alert.time}</span>
                    </div>
                    <p className="text-gray-300 text-xs">{alert.message}</p>
                    <p className="text-gray-500 text-xs mt-1">📱 Notificación enviada</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="p-4 border-t border-gray-800 bg-gray-950/50">
            <p className="text-xs text-gray-500 mb-3">¿Te convenciste? Únete a la lista de espera.</p>
            <a
              href="/#waitlist"
              className="block w-full text-center bg-green-600 hover:bg-green-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
            >
              Solicitar acceso anticipado
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: "green" | "red" | "blue" | "purple" | "gray";
}) {
  const colorMap = {
    green: "text-green-400",
    red: "text-red-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    gray: "text-gray-400",
  };
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className={`text-2xl font-bold ${colorMap[color]}`}>
        {value}
        <span className="text-sm font-normal text-gray-500 ml-0.5">{unit}</span>
      </div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}
