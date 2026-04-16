import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Floq — Demo",
  description: "Explora Floq: demos para ganaderos e inversores.",
};

export default function DemoHubPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <span className="font-bold text-lg text-white tracking-tight">Floq</span>
        </Link>
        <span className="text-gray-500 text-sm">Centro de demos</span>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-3xl w-full text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/50 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Demos en vivo
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Elige tu demo
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Floq tiene dos experiencias distintas según lo que necesitas ver.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Farmer demo card */}
          <Link
            href="/demo/ganadero"
            className="group flex flex-col bg-gray-900 border border-gray-800 hover:border-green-700/60 rounded-2xl p-8 transition-all hover:bg-gray-900/80"
          >
            <div className="w-14 h-14 rounded-xl bg-green-900/40 border border-green-700/40 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
              🐄
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Demo para ganaderos</h2>
            <p className="text-gray-400 text-sm flex-1 mb-6">
              Simulación interactiva en vivo: cercado virtual, alertas automáticas y monitoreo de hato en tiempo real.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Cercado virtual", "Alertas", "Bienestar animal"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-green-900/30 text-green-400 border border-green-800/50"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium group-hover:gap-3 transition-all">
              Ver demo interactivo
              <span>→</span>
            </div>
          </Link>

          {/* Investor demo card */}
          <Link
            href="/demo/inversores"
            className="group flex flex-col bg-gray-900 border border-gray-800 hover:border-indigo-700/60 rounded-2xl p-8 transition-all hover:bg-gray-900/80"
          >
            <div className="w-14 h-14 rounded-xl bg-indigo-900/40 border border-indigo-700/40 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
              📊
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Demo para inversores</h2>
            <p className="text-gray-400 text-sm flex-1 mb-6">
              Oportunidad de mercado, modelo de negocio, métricas clave y visión de Floq en Latinoamérica.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Mercado", "Modelo SaaS", "Impacto"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-indigo-900/30 text-indigo-400 border border-indigo-800/50"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium group-hover:gap-3 transition-all">
              Ver pitch de inversión
              <span>→</span>
            </div>
          </Link>
        </div>

        <p className="mt-10 text-gray-600 text-sm">
          ¿Tienes preguntas?{" "}
          <a href="mailto:hola@floq.app" className="text-gray-400 hover:text-white transition-colors">
            Contáctanos
          </a>
        </p>
      </main>
    </div>
  );
}
