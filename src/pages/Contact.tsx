import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UffoLogo from "../components/UffoLogo";
import Footer from "../components/Footer";
import { useLanguage } from "../i18n";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { copy } = useLanguage();
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
    if (!form.name.trim()) errs.name = copy.contact.errorRequiredName;
    if (!form.email.trim()) errs.email = copy.contact.errorRequiredEmail;
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = copy.contact.errorInvalidEmail;
    if (!form.service) errs.service = copy.contact.errorRequiredService;
    if (!form.description.trim()) errs.description = copy.contact.errorRequiredDescription;
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
          _subject: `${copy.contact.submit}: ${form.name}`,
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
            {copy.contact.label}
          </span>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight mb-6"
            style={{ color: "var(--c-fg)" }}
          >
            {copy.contact.title[0]}
            <br />
            <span style={{ color: "var(--c-accent)" }}>{copy.contact.title[1]}</span>
          </h1>
          <p
            className="text-base md:text-lg font-light max-w-md"
            style={{ color: "var(--c-fg-sub)" }}
          >
            {copy.contact.intro}
          </p>
        </div>
      </section>

      {/* ── Form ───────────────────────────────────── */}
      <section className="px-6 md:px-12 pb-28">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
            {/* Name */}
            <Field fieldId="name" label={copy.contact.nameLabel} error={errors.name}>
              <input
                id="name"
                type="text"
                placeholder={copy.contact.namePlaceholder}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                style={inputStyle("name")}
                onFocus={focusStyle}
                onBlur={(e) => blurStyle(e, "name")}
              />
            </Field>

            {/* Phone */}
            <Field fieldId="phone" label={copy.contact.phoneLabel}>
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
            <Field fieldId="email" label={copy.contact.emailLabel} error={errors.email}>
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
            <Field fieldId="service" label={copy.contact.serviceLabel} error={errors.service}>
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
                    {copy.contact.selectPlaceholder}
                  </option>
                  {copy.contact.serviceOptions.map((opt) => (
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
            <Field fieldId="description" label={copy.contact.descriptionLabel} error={errors.description}>
              <textarea
                id="description"
                placeholder={copy.contact.descriptionPlaceholder}
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
            <Field fieldId="how" label={copy.contact.howLabel}>
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
                    {copy.contact.selectPlaceholder}
                  </option>
                  {copy.contact.howOptions.map((opt) => (
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
                  {copy.contact.submitError}
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
                    {copy.contact.sending}
                  </>
                ) : (
                  copy.contact.submit
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
              {copy.contact.successTitle}
            </h2>

            <p
              className="text-sm md:text-base font-light leading-relaxed mb-10"
              style={{ color: "var(--c-fg-sub)" }}
            >
              {copy.contact.successBody[0]}
              <br />
              {copy.contact.successBody[1]}
            </p>

            <button
              onClick={handleGoHome}
              className="font-bold tracking-widest text-sm px-8 py-4 theme-transition"
              style={{ backgroundColor: "var(--c-accent)", color: "var(--c-accent-fg)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {copy.contact.backHome}
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
