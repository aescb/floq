"use client";

import Link from "next/link";
import { useState } from "react";

// ── Slide data ────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: "portada",
    label: "Floq",
  },
  {
    id: "problema",
    label: "Problema",
  },
  {
    id: "solucion",
    label: "Solución",
  },
  {
    id: "mercado",
    label: "Mercado",
  },
  {
    id: "modelo",
    label: "Modelo",
  },
  {
    id: "traccion",
    label: "Tracción",
  },
  {
    id: "equipo",
    label: "Equipo",
  },
  {
    id: "ask",
    label: "La oferta",
  },
];

// ── Component ─────────────────────────────────────────────────────────────
export default function InvestorDemo() {
  const [slide, setSlide] = useState(0);

  const prev = () => setSlide((s) => Math.max(0, s - 1));
  const next = () => setSlide((s) => Math.min(SLIDES.length - 1, s + 1));

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/demo" className="text-gray-500 hover:text-gray-300 text-sm transition-colors mr-1">
            ← Demos
          </Link>
          <div className="w-px h-4 bg-gray-700" />
          <span className="text-xl">🌿</span>
          <span className="font-bold text-white">Floq</span>
          <span className="text-gray-500 text-sm">— Pitch para inversores</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-xs text-gray-500">
            {slide + 1} / {SLIDES.length}
          </span>
          <a
            href="mailto:hola@floq.app"
            className="text-xs bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-md font-medium transition-colors"
          >
            Agendar reunión →
          </a>
        </div>
      </header>

      {/* Slide tabs */}
      <div className="border-b border-gray-800 bg-gray-900 px-4 flex items-center gap-1 overflow-x-auto flex-shrink-0">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setSlide(i)}
            className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
              slide === i
                ? "text-indigo-400 border-indigo-500"
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <SlideView slide={slide} total={SLIDES.length} onPrev={prev} onNext={next} />
      </div>
    </div>
  );
}

// ── Slide renderer ────────────────────────────────────────────────────────
function SlideView({
  slide,
  total,
  onPrev,
  onNext,
}: {
  slide: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col relative">
      <div className="flex-1 overflow-y-auto">
        {slide === 0 && <SlidePortada />}
        {slide === 1 && <SlideProblema />}
        {slide === 2 && <SlideSolucion />}
        {slide === 3 && <SlideMercado />}
        {slide === 4 && <SlideModelo />}
        {slide === 5 && <SlideTraccion />}
        {slide === 6 && <SlideEquipo />}
        {slide === 7 && <SlideAsk />}
      </div>

      {/* Navigation */}
      <div className="flex-shrink-0 border-t border-gray-800 bg-gray-900 px-6 py-3 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={slide === 0}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Anterior
        </button>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === slide ? "bg-indigo-400" : "bg-gray-700"
              }`}
            />
          ))}
        </div>
        <button
          onClick={onNext}
          disabled={slide === total - 1}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

// ── Individual slides ─────────────────────────────────────────────────────

function SlidePortada() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] px-8 py-16 text-center">
      <div className="w-20 h-20 rounded-2xl bg-green-900/40 border border-green-700/40 flex items-center justify-center text-5xl mb-8">
        🌿
      </div>
      <div className="inline-flex items-center gap-2 bg-indigo-900/30 border border-indigo-700/50 text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
        Seed Round · 2026
      </div>
      <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight">Floq</h1>
      <p className="text-xl text-gray-300 max-w-lg mb-8">
        Cercado virtual con IA para el ganado latinoamericano.
        <br />
        Sin postes. Sin alambre. Sin recorridos.
      </p>
      <div className="grid grid-cols-3 gap-8 mt-4 text-center max-w-lg w-full">
        <div>
          <div className="text-3xl font-bold text-green-400">Chile</div>
          <div className="text-xs text-gray-500 mt-1">Mercado inicial</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-green-400">$1.2B</div>
          <div className="text-xs text-gray-500 mt-1">TAM LatAm</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-green-400">SaaS</div>
          <div className="text-xs text-gray-500 mt-1">Modelo recurrente</div>
        </div>
      </div>
    </div>
  );
}

function SlideProblema() {
  const problems = [
    {
      icon: "🪨",
      title: "Cercas físicas cuestan una fortuna",
      body: "Instalar 1 km de cerco convencional cuesta entre $800.000 y $2.000.000 CLP y requiere mantenimiento constante.",
    },
    {
      icon: "🌙",
      title: "El ganado se escapa de noche",
      body: "El 68% de los accidentes con ganado ocurren fuera del horario laboral, cuando nadie puede responder a tiempo.",
    },
    {
      icon: "🗺️",
      title: "La gestión de potreros es manual",
      body: "Los ganaderos recorren a caballo o en camioneta para verificar el estado del hato, perdiendo horas cada día.",
    },
    {
      icon: "📉",
      title: "El pequeño ganadero no tiene tecnología",
      body: "Las soluciones existentes de precision livestock son para grandes corporaciones. No hay nada para el productor de 20–200 animales.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-8 py-14">
      <SlideHeader
        tag="El problema"
        title="Gestionar ganado en terreno sigue siendo medieval"
        sub="180 millones de bovinos en América Latina. La mayoría gestionados igual que hace 100 años."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {problems.map((p) => (
          <div key={p.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-4">{p.icon}</div>
            <h3 className="text-white font-semibold mb-2">{p.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideSolucion() {
  const features = [
    { icon: "📡", title: "Collares IoT", body: "GPS + acelerómetro + frecuencia cardíaca. Batería de 6 meses. Funciona con conectividad mínima." },
    { icon: "🤖", title: "IA en el collar", body: "Modelos edge que detectan comportamientos anómalos, estrés y enfermedad antes que el ojo humano." },
    { icon: "🔔", title: "Alertas instantáneas", body: "Notificación push al celular del productor en menos de 30 segundos al detectar una salida de cerco." },
    { icon: "🗺️", title: "Cercado virtual flexible", body: "Define potreros desde el teléfono en minutos. Cambia la geometría sin mover un poste." },
    { icon: "📊", title: "Dashboard de hato", body: "Historial de movimientos, bienestar animal, rotación de potreros — todo en una sola pantalla." },
    { icon: "🌐", title: "Funciona sin internet", body: "Protocolo LoRa para zonas rurales con cobertura limitada. Sincroniza cuando hay señal." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-8 py-14">
      <SlideHeader
        tag="La solución"
        title="Floq: el sistema nervioso de tu predio"
        sub="Un collar inteligente + una app — y el productor sabe todo sobre su hato desde cualquier lugar."
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map((f) => (
          <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="text-white font-semibold text-sm mb-1.5">{f.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideMercado() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-14">
      <SlideHeader
        tag="Mercado"
        title="Un mercado enorme y sin tecnología real"
        sub="LatAm tiene el 23% del hato bovino mundial. Menos del 2% usa tecnología de monitoreo."
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <MarketCard
          label="TAM"
          value="$1.2B"
          color="indigo"
          desc="Total mercado gestión ganadera LatAm"
          detail="Chile, Argentina, Brasil, Colombia, México"
        />
        <MarketCard
          label="SAM"
          value="$180M"
          color="purple"
          desc="Pequeños y medianos productores (<500 animales)"
          detail="~3.2 millones de predios en la región"
        />
        <MarketCard
          label="SOM"
          value="$12M"
          color="green"
          desc="Chile — Año 3"
          detail="12.000 predios a $83/mes promedio"
        />
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 text-sm">¿Por qué ahora?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-400">
          <div className="flex gap-3">
            <span className="text-green-400 flex-shrink-0">✓</span>
            <span>El costo del GPS + LoRa cayó un 80% en 5 años — los collares ahora son asequibles para el ganadero promedio.</span>
          </div>
          <div className="flex gap-3">
            <span className="text-green-400 flex-shrink-0">✓</span>
            <span>Penetración de smartphones en zonas rurales de Chile superó el 75% en 2024.</span>
          </div>
          <div className="flex gap-3">
            <span className="text-green-400 flex-shrink-0">✓</span>
            <span>Chile tiene el marco regulatorio y subsidios AgTech más avanzados de la región (CORFO, INDAP).</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideModelo() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-14">
      <SlideHeader
        tag="Modelo de negocio"
        title="Hardware + SaaS recurrente"
        sub="Venta inicial del collar amortiza el CAC. La suscripción mensual construye el ARR."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">Collar IoT</div>
          <div className="text-4xl font-bold text-white mb-1">$49.990 CLP</div>
          <div className="text-gray-500 text-sm mb-4">por collar (venta única)</div>
          <ul className="space-y-1.5 text-sm text-gray-400">
            <li className="flex gap-2"><span className="text-green-400">✓</span> GPS + acelerómetro + BPM</li>
            <li className="flex gap-2"><span className="text-green-400">✓</span> Batería 6 meses</li>
            <li className="flex gap-2"><span className="text-green-400">✓</span> Resistente al agua (IP67)</li>
          </ul>
        </div>
        <div className="bg-gray-900 border border-indigo-700/40 rounded-xl p-6">
          <div className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">Suscripción Floq Pro</div>
          <div className="text-4xl font-bold text-white mb-1">$4.990 CLP</div>
          <div className="text-gray-500 text-sm mb-1">por collar / mes</div>
          <div className="text-indigo-400 text-xs mb-4">~$6 USD — sin límite de animales en plan hato completo</div>
          <ul className="space-y-1.5 text-sm text-gray-400">
            <li className="flex gap-2"><span className="text-green-400">✓</span> Cerco virtual ilimitado</li>
            <li className="flex gap-2"><span className="text-green-400">✓</span> Alertas y notificaciones</li>
            <li className="flex gap-2"><span className="text-green-400">✓</span> Historial y analytics</li>
            <li className="flex gap-2"><span className="text-green-400">✓</span> Soporte prioritario</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "LTV (100 collares, 3 años)", value: "$1.8M CLP" },
          { label: "CAC estimado", value: "$35.000 CLP" },
          { label: "Gross margin SaaS", value: "~82%" },
          { label: "Payback period", value: "< 4 meses" },
        ].map((m) => (
          <div key={m.label} className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-white">{m.value}</div>
            <div className="text-xs text-gray-500 mt-1">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideTraccion() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-14">
      <SlideHeader
        tag="Tracción"
        title="Construyendo desde el campo, no desde la oficina"
        sub="Early traction en Chile antes de levantar capital."
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          { value: "340+", label: "Ganaderos en lista de espera", color: "text-green-400" },
          { value: "3", label: "Predios piloto confirmados", color: "text-green-400" },
          { value: "Q3 2026", label: "Lanzamiento hardware beta", color: "text-indigo-400" },
        ].map((s) => (
          <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className={`text-4xl font-bold mb-2 ${s.color}`}>{s.value}</div>
            <div className="text-gray-400 text-sm">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 text-sm">Hitos 2026</h3>
        <div className="space-y-3">
          {[
            { q: "Q2 2026", done: true, text: "MVP de software live — landing page + demo interactivo" },
            { q: "Q2 2026", done: true, text: "Lista de espera con 300+ ganaderos sin ads" },
            { q: "Q3 2026", done: false, text: "Primer prototipo de collar funcional — 3 predios piloto" },
            { q: "Q3 2026", done: false, text: "Cierre seed round ($300K–$500K USD)" },
            { q: "Q4 2026", done: false, text: "Lanzamiento comercial en Chile — 50 predios pagando" },
            { q: "Q1 2027", done: false, text: "Expansión Argentina · breakeven operativo" },
          ].map((h) => (
            <div key={h.text} className="flex items-start gap-3">
              <span
                className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center text-xs mt-0.5 ${
                  h.done
                    ? "bg-green-600 border-green-500 text-white"
                    : "border-gray-600 text-gray-600"
                }`}
              >
                {h.done ? "✓" : ""}
              </span>
              <div>
                <span className="text-xs text-gray-500 mr-2">{h.q}</span>
                <span className={`text-sm ${h.done ? "text-white" : "text-gray-400"}`}>{h.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideEquipo() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-14">
      <SlideHeader
        tag="Equipo"
        title="Founders con piel en el juego"
        sub="Construido por personas que conocen el agro y la tecnología."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <TeamCard
          emoji="🧑‍💼"
          name="CEO & Co-founder"
          title="Estrategia y producto"
          bullets={[
            "Familia ganadera — 3 generaciones en el sur de Chile",
            "Background en negocios y operaciones agrícolas",
            "Entiende el problema desde adentro",
          ]}
        />
        <TeamCard
          emoji="👨‍💻"
          name="CTO & Co-founder"
          title="Tecnología e IA"
          bullets={[
            "Ingeniero full-stack con experiencia en IoT",
            "Especialización en edge AI y computer vision",
            "Construyó el MVP end-to-end",
          ]}
        />
      </div>
      <div className="bg-indigo-900/20 border border-indigo-700/40 rounded-xl p-6">
        <h3 className="text-indigo-300 font-semibold mb-3 text-sm">Advisors y red</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-400">
          <div>🏛️ Conexión con CORFO y programas INDAP Chile</div>
          <div>🐄 Red de cooperativas ganaderas en La Araucanía y Los Lagos</div>
          <div>🔬 Vínculo con facultades de Agronomía UACH y UC</div>
        </div>
      </div>
    </div>
  );
}

function SlideAsk() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-14">
      <SlideHeader
        tag="La oferta"
        title="Seed round: $400K USD"
        sub="Capital para hardware, piloto comercial y primeros 50 clientes pagando."
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { pct: "45%", label: "Hardware R&D", desc: "Finalizar diseño del collar, producción del lote piloto (200 unidades)", color: "bg-indigo-500" },
          { pct: "30%", label: "Go-to-market", desc: "Equipo de ventas campo, demos en ferias ganaderas, alianzas con cooperativas", color: "bg-green-500" },
          { pct: "25%", label: "Equipo y ops", desc: "Ingenieros hardware/firmware, soporte técnico, operaciones Chile", color: "bg-purple-500" },
        ].map((u) => (
          <div key={u.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className={`text-3xl font-bold mb-1 ${u.color.replace("bg-", "text-")}`}>{u.pct}</div>
            <div className="text-white font-semibold text-sm mb-2">{u.label}</div>
            <p className="text-gray-400 text-xs leading-relaxed">{u.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-4 text-sm">Con este capital, en 18 meses:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { v: "50+", l: "Predios pagando" },
            { v: "$30K", l: "MRR objetivo" },
            { v: "500+", l: "Collares desplegados" },
            { v: "1", l: "País adicional" },
          ].map((m) => (
            <div key={m.l}>
              <div className="text-2xl font-bold text-green-400">{m.v}</div>
              <div className="text-xs text-gray-500 mt-1">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="mailto:hola@floq.app?subject=Interes en Floq - Seed Round"
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-3.5 rounded-xl text-center transition-colors"
        >
          Agendar reunión →
        </a>
        <a
          href="/#waitlist"
          className="flex-1 border border-gray-700 hover:border-gray-500 text-gray-300 text-sm font-medium py-3.5 rounded-xl text-center transition-colors"
        >
          Ver demo para ganaderos
        </a>
      </div>
    </div>
  );
}

// ── Helper components ─────────────────────────────────────────────────────

function SlideHeader({
  tag,
  title,
  sub,
}: {
  tag: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-8">
      <span className="inline-block text-xs font-semibold text-indigo-400 uppercase tracking-wider bg-indigo-900/30 border border-indigo-700/40 px-3 py-1 rounded-full mb-4">
        {tag}
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">{title}</h2>
      <p className="text-gray-400 text-base max-w-2xl">{sub}</p>
    </div>
  );
}

function MarketCard({
  label,
  value,
  color,
  desc,
  detail,
}: {
  label: string;
  value: string;
  color: "indigo" | "purple" | "green";
  desc: string;
  detail: string;
}) {
  const textColor = { indigo: "text-indigo-400", purple: "text-purple-400", green: "text-green-400" }[color];
  const borderColor = {
    indigo: "border-indigo-700/40",
    purple: "border-purple-700/40",
    green: "border-green-700/40",
  }[color];

  return (
    <div className={`bg-gray-900 border rounded-xl p-6 ${borderColor}`}>
      <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${textColor}`}>{label}</div>
      <div className={`text-4xl font-bold mb-2 ${textColor}`}>{value}</div>
      <p className="text-white text-sm font-medium mb-1">{desc}</p>
      <p className="text-gray-500 text-xs">{detail}</p>
    </div>
  );
}

function TeamCard({
  emoji,
  name,
  title,
  bullets,
}: {
  emoji: string;
  name: string;
  title: string;
  bullets: string[];
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-white font-bold mb-0.5">{name}</h3>
      <p className="text-indigo-400 text-sm mb-4">{title}</p>
      <ul className="space-y-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2 text-sm text-gray-400">
            <span className="text-green-400 flex-shrink-0">·</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
