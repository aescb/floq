export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-bold text-white text-xl">Floq</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm">
            <a
              href="mailto:hola@floq.cl"
              className="hover:text-white transition-colors"
            >
              hola@floq.cl
            </a>
            <span className="hidden sm:block text-gray-700">|</span>
            <span>Chile · Latinoamérica</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Floq. Todos los derechos reservados. Hecho con ❤️ para el campo latinoamericano.
        </div>
      </div>
    </footer>
  );
}
