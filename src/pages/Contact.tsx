import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../App";
import UffoLogo from "../components/UffoLogo";
import Footer from "../components/Footer";

const serviceOptions = [
  "Branding",
  "Identidad visual",
  "Diseño web",
  "Desarrollo web",
  "E-commerce",
  "UX/UI",
  "Diseño gráfico",
  "Marketing digital",
  "SEO / SEM",
  "Animación",
  "Contenido visual",
  "Otro",
];

const howOptions = [
  "Instagram",
  "TikTok",
  "Google",
  "Behance",
  "Recomendación / referencia",
  "Un cliente anterior",
  "Evento",
  "Universidad / institución",
  "Otro",
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    description: "",
    how: "",
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Tu nombre es requerido.";
    if (!form.email.trim()) errs.email = "El email es requerido.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email inválido.";
    if (!form.service) errs.service = "Seleccioná un servicio.";
    if (!form.description.trim()) errs.description = "Describinos tu proyecto.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("https://formsubmit.co/ajax/somosuffo@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nombre: form.name,
          whatsapp: form.phone || "No informado",
          email: form.email,
          servicio: form.service,
          proyecto: form.description,
          como_nos_conocio: form.how || "No informado",
          _subject: `Nuevo proyecto desde UFFO: ${form.name}`,
          _replyto: form.email,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar el formulario.");
      }

      window.gtag?.("event", "contact_form_submit", {
        service: form.service,
      });
      setStatus("success");
      setShowModal(true);
    } catch {
      setStatus("error");
    }
  };

  const handleGoHome = () => {
    setShowModal(false);
    window.scrollTo(0, 0);
    navigate("/");
  };

  /* ── Input styles helper ─────────────────────── */
  const inputStyle = (field: string): React.CSSProperties => ({
    backgroundColor: "var(--c-input)",
    border: `1px solid ${errors[field] ? "#e55" : "var(--c-input-border)"}`,
    color: "var(--c-fg)",
    fontFamily: "Rubik, sans-serif",
    width: "100%",
    padding: "14px 16px",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    borderRadius: 0,
  });

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--c-accent)";
    e.currentTarget.style.boxShadow = `0 0 0 2px color-mix(in srgb, var(--c-accent) 20%, transparent)`;
  };

  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string) => {
    e.currentTarget.style.borderColor = errors[field] ? "#e55" : "var(--c-input-border)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={{ backgroundColor: "var(--c-bg)", color: "var(--c-fg)", minHeight: "100vh" }}>
      {/* ── Hero ───────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div
          className="absolute right-[-5%] bottom-[-10%] pointer-events-none select-none opacity-[0.07]"
          style={{ width: "min(60vw, 400px)" }}
        >
          <UffoLogo fill="var(--c-fg)" />
        </div>

        <div className="max-w-4xl relative z-10">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase py-1.5 px-3 mb-8 theme-transition"
            style={{ color: "var(--c-accent)", border: "1px solid var(--c-accent)" }}
          >
            Contacto
          </span>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight mb-6"
            style={{ color: "var(--c-fg)" }}
          >
            Comencemos
            <br />
            <span style={{ color: "var(--c-accent)" }}>a cranear.</span>
          </h1>
          <p
            className="text-base md:text-lg font-light max-w-md"
            style={{ color: "var(--c-fg-sub)" }}
          >
            Contanos qué necesitás y nos ponemos en contacto con vos.
          </p>
        </div>
      </section>

      {/* ── Form ───────────────────────────────────── */}
      <section className="px-6 md:px-12 pb-28">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
            {/* Name */}
            <Field fieldId="name" label="¿Cómo te llamás?" error={errors.name}>
              <input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                style={inputStyle("name")}
                onFocus={focusStyle}
                onBlur={(e) => blurStyle(e, "name")}
              />
            </Field>

            {/* Phone */}
            <Field fieldId="phone" label="WhatsApp">
              <input
                id="phone"
                type="tel"
                placeholder="+54 9 ..."
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                style={inputStyle("phone")}
                onFocus={focusStyle}
                onBlur={(e) => blurStyle(e, "phone")}
              />
            </Field>

            {/* Email */}
            <Field fieldId="email" label="Email" error={errors.email}>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                style={inputStyle("email")}
                onFocus={focusStyle}
                onBlur={(e) => blurStyle(e, "email")}
              />
            </Field>

            {/* Service */}
            <Field fieldId="service" label="¿Qué necesitás?" error={errors.service}>
              <div className="relative">
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  aria-invalid={Boolean(errors.service)}
                  style={{
                    ...inputStyle("service"),
                    appearance: "none",
                    cursor: "pointer",
                  }}
                  onFocus={focusStyle}
                  onBlur={(e) => blurStyle(e, "service")}
                >
                  <option value="" disabled style={{ backgroundColor: "var(--c-bg)", color: "var(--c-fg-sub)" }}>
                    Seleccioná una opción
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} style={{ backgroundColor: "var(--c-bg)", color: "var(--c-fg)" }}>
                      {opt}
                    </option>
                  ))}
                </select>
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-sm"
                  style={{ color: "var(--c-fg-sub)" }}
                >
                  ↓
                </span>
              </div>
            </Field>

            {/* Description */}
            <Field fieldId="description" label="Describinos mejor tu idea" error={errors.description}>
              <textarea
                id="description"
                placeholder="Contanos un poco más sobre tu proyecto, qué querés lograr, en qué etapa estás y cualquier información que creas importante..."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                aria-invalid={Boolean(errors.description)}
                rows={6}
                style={{
                  ...inputStyle("description"),
                  resize: "vertical",
                  lineHeight: "1.6",
                }}
                onFocus={focusStyle}
                onBlur={(e) => blurStyle(e, "description")}
              />
            </Field>

            {/* How */}
            <Field fieldId="how" label="¿Cómo nos conociste?">
              <div className="relative">
                <select
                  id="how"
                  value={form.how}
                  onChange={(e) => update("how", e.target.value)}
                  style={{
                    ...inputStyle("how"),
                    appearance: "none",
                    cursor: "pointer",
                  }}
                  onFocus={focusStyle}
                  onBlur={(e) => blurStyle(e, "how")}
                >
                  <option value="" style={{ backgroundColor: "var(--c-bg)", color: "var(--c-fg-sub)" }}>
                    Seleccioná una opción
                  </option>
                  {howOptions.map((opt) => (
                    <option key={opt} value={opt} style={{ backgroundColor: "var(--c-bg)", color: "var(--c-fg)" }}>
                      {opt}
                    </option>
                  ))}
                </select>
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-sm"
                  style={{ color: "var(--c-fg-sub)" }}
                >
                  ↓
                </span>
              </div>
            </Field>

            {/* Submit */}
            <div className="pt-4">
              {status === "error" && (
                <p className="text-sm mb-4" style={{ color: "#e55" }}>
                  Hubo un error al enviar. Intentá de nuevo.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full md:w-auto font-bold tracking-widest text-sm px-10 py-5 theme-transition flex items-center gap-3 justify-center"
                style={{
                  backgroundColor: status === "loading" ? "var(--c-border)" : "var(--c-accent)",
                  color: status === "loading" ? "var(--c-fg-sub)" : "var(--c-accent-fg)",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                }}
              >
                {status === "loading" ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ENVIANDO...
                  </>
                ) : (
                  "ENVIAR PROYECTO →"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />

      {/* ── Success Modal ───────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 theme-transition"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) handleGoHome(); }}
        >
          <div
            className="relative max-w-md w-full p-10 md:p-14 text-center theme-transition"
            style={{
              backgroundColor: "var(--c-bg)",
              border: "1px solid var(--c-border)",
            }}
          >
            {/* Isotipo */}
            <div className="flex justify-center mb-8">
              <UffoLogo className="h-16 w-auto" fill="var(--c-accent)" />
            </div>

            <h2
              className="text-2xl md:text-3xl font-bold uppercase mb-4"
              style={{ color: "var(--c-fg)" }}
            >
              ¡Gracias por contactarnos!
            </h2>

            <p
              className="text-sm md:text-base font-light leading-relaxed mb-10"
              style={{ color: "var(--c-fg-sub)" }}
            >
              Ya recibimos tu proyecto.
              <br />
              En breve nos vamos a poner en contacto con vos.
            </p>

            <button
              onClick={handleGoHome}
              className="font-bold tracking-widest text-sm px-8 py-4 theme-transition"
              style={{ backgroundColor: "var(--c-accent)", color: "var(--c-accent-fg)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              VOLVER AL INICIO
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Field wrapper ───────────────────────────────── */
function Field({
  fieldId,
  label,
  error,
  children,
}: {
  fieldId: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={fieldId}
        className="block text-xs font-bold tracking-widest uppercase mb-3 theme-transition"
        style={{ color: "var(--c-fg-sub)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs mt-2 font-medium" style={{ color: "#e55" }}>
          {error}
        </p>
      )}
    </div>
  );
}
