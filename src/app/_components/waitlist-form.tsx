"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : null;

const LATAM_COUNTRIES = [
  "Chile",
  "Argentina",
  "Brasil",
  "Colombia",
  "México",
  "Perú",
  "Uruguay",
  "Ecuador",
  "Bolivia",
  "Paraguay",
  "Venezuela",
  "Otro",
];

const COMPANY_SIZES = [
  { value: "1-50", label: "1–50 animales" },
  { value: "51-200", label: "51–200 animales" },
  { value: "201-500", label: "201–500 animales" },
  { value: "500+", label: "Más de 500 animales" },
];

export default function WaitlistForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    companySize: "",
    country: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setError("");

    if (!FORMSPREE_ENDPOINT) {
      // Dev mode: simulate success
      await new Promise((r) => setTimeout(r, 800));
      setState("success");
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          "Tamaño del rebaño": form.companySize,
          País: form.country,
        }),
      });

      if (res.ok) {
        setState("success");
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setState("error");
      setError("Hubo un problema al enviar. Inténtalo de nuevo o escríbenos a hola@floq.cl");
    }
  };

  if (state === "success") {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🎉</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          ¡Estás en la lista!
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Te contactaremos pronto con los detalles del acceso anticipado. Primeros 50 productores tienen acceso gratuito.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Juan Pérez"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="juan@predio.cl"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1.5">
            Tamaño del rebaño
          </label>
          <select
            id="companySize"
            name="companySize"
            required
            value={form.companySize}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white appearance-none"
          >
            <option value="" disabled>
              Selecciona un rango
            </option>
            {COMPANY_SIZES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1.5">
            País
          </label>
          <select
            id="country"
            name="country"
            required
            value={form.country}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white appearance-none"
          >
            <option value="" disabled>
              Selecciona tu país
            </option>
            {LATAM_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold text-lg py-4 rounded-xl transition-all hover:shadow-lg disabled:cursor-not-allowed"
      >
        {state === "submitting" ? "Enviando..." : "Solicitar acceso anticipado →"}
      </button>

      <p className="text-center text-xs text-gray-400">
        Sin spam. Solo actualizaciones de Floq. Cancela cuando quieras.
      </p>
    </form>
  );
}
