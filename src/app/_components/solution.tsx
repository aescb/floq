const features = [
  {
    icon: "📡",
    tag: "Cercado Virtual",
    title: "Controla el territorio sin un metro de alambre",
    description:
      "Define zonas virtuales desde tu teléfono. Los collares GPS guían al ganado mediante señales suaves, sin dolor ni estrés. Mueve potreros en segundos, no días.",
    highlight: "Ahorra hasta 80% en infraestructura de cercos",
  },
  {
    icon: "❤️",
    tag: "Bienestar Animal",
    title: "Detecta problemas antes de que sean crisis",
    description:
      "Los sensores biométricos monitorean temperatura, actividad, rumia y comportamiento 24/7. La IA identifica anomalías horas — a veces días — antes que el ojo humano.",
    highlight: "Reducción del 40% en pérdidas por enfermedad",
  },
  {
    icon: "🧠",
    tag: "Optimización de Pastoreo",
    title: "Decisiones de pastoreo basadas en datos reales",
    description:
      "El sistema analiza el estado de cada potrero, el comportamiento del rebaño y las condiciones climáticas para recomendar rotaciones óptimas. Más pasto, mejor suelo, mayor productividad.",
    highlight: "Hasta 35% más productividad por hectárea",
  },
];

export default function Solution() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">
            La solución
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-gray-900">
            Floq: inteligencia artificial para el campo real
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Tres pilares tecnológicos que transforman cómo se maneja el ganado en Latinoamérica — accesibles desde cualquier smartphone.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={f.tag} className="relative group">
              <div className="h-full bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-5xl mb-5">{f.icon}</div>
                <span className="text-xs font-bold text-green-700 uppercase tracking-wider bg-green-100 px-3 py-1 rounded-full">
                  {f.tag}
                </span>
                <h3 className="mt-4 text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{f.description}</p>
                <div className="border-t border-green-100 pt-4">
                  <p className="text-green-700 font-semibold text-sm">✓ {f.highlight}</p>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
