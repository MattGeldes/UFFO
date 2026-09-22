import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../App";
import UffoLogo from "../components/UffoLogo";
import Footer from "../components/Footer";

/* ── Reveal hook ─────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Services data ───────────────────────────────── */
const services = [
  { num: "01", name: "Diseño gráfico", desc: "Creamos piezas visuales que comunican ideas con claridad y coherencia, desde piezas digitales hasta aplicaciones gráficas." },
  { num: "02", name: "Branding & Identidad", desc: "Construimos sistemas visuales que ayudan a una marca a diferenciarse, comunicar su personalidad y mantener coherencia en cada punto de contacto." },
  { num: "03", name: "Diseño Web", desc: "Diseñamos sitios web modernos, claros y orientados a objetivos, combinando estética, experiencia y funcionalidad." },
  { num: "04", name: "UX/UI", desc: "Diseñamos experiencias digitales intuitivas, pensando tanto en las necesidades de las personas como en los objetivos del proyecto." },
  { num: "05", name: "E-commerce", desc: "Diseñamos experiencias de compra digitales pensadas para que navegar, elegir y comprar sea simple." },
  { num: "06", name: "Desarrollo Web", desc: "Convertimos los diseños en sitios funcionales, responsive y preparados para crecer junto al proyecto." },
  { num: "07", name: "Marketing Digital", desc: "Creamos recursos y estrategias visuales para ayudar a las marcas a comunicar y conectar mejor con su audiencia." },
  { num: "08", name: "SEO / SEM", desc: "Trabajamos la presencia digital para mejorar la visibilidad de una marca y facilitar que las personas correctas la encuentren." },
  { num: "09", name: "Animación", desc: "Damos movimiento a ideas, piezas y marcas para generar contenido más dinámico y atractivo." },
  { num: "10", name: "Contenido visual", desc: "Desarrollamos recursos visuales para redes, campañas, productos y diferentes necesidades de comunicación." },
];

/* ── FAQ data ────────────────────────────────────── */
const faqs = [
  { q: "¿En qué tipos de proyectos trabajan?", a: "Trabajamos en branding, diseño web, desarrollo, marketing digital, UX/UI, e-commerce, animación y contenido visual. Si tenés una idea y necesitás darle forma, podemos ayudarte." },
  { q: "¿Cómo trabajan y qué dinámica tienen?", a: "De manera ágil y colaborativa. Dividimos cada proyecto en etapas claras, con entregas parciales y puntos de revisión para que siempre estés al tanto del avance." },
  { q: "¿Cómo sé cuánto voy a invertir?", a: "Después de conocer tu proyecto, te enviamos una propuesta detallada con el alcance, tiempos y presupuesto. Cada proyecto es diferente, por eso personalizamos cada cotización." },
  { q: "¿Qué formas de pago ofrecen?", a: "Generalmente es acorde al proyecto. Aceptamos medios de pago estandarizados como efectivo, transferencia bancaria, tarjeta de crédito/débito y plataformas digitales." },
  { q: "¿Qué pasa si necesito cambios?", a: "Cada proyecto incluye rondas de revisión. Si necesitás cambios fuera del alcance acordado, los evaluamos y te informamos el costo adicional antes de proceder." },
  { q: "¿Cómo funcionan las revisiones?", a: "Cada etapa del proyecto incluye revisiones específicas. Vos revisás, nos das feedback y nosotros ajustamos. Así el resultado final es el que realmente necesitás." },
  { q: "¿Qué pasa si necesito algo urgente?", a: "Tenemos disponibilidad para proyectos urgentes según nuestra agenda. Contactanos y vemos cómo podemos ayudarte dentro de tus tiempos." },
  { q: "¿Cómo recibo el trabajo final?", a: "Te entregamos todos los archivos finales en los formatos acordados, ordenados y listos para usar." },
  { q: "¿Cuánto demora un proyecto?", a: "Los tiempos varían según el tipo y complejidad del proyecto. Siempre comunicamos los tiempos estimados antes de comenzar." },
];

/* ── Portfolio data ──────────────────────────────── */
const works = [
  {
    name: "Bros & Burgers",
    category: "Branding",
    desc: "Sistema de identidad visual completo para local de comida rápida.",
    img: "https://instagram.fafa1-1.fna.fbcdn.net/v/t51.82787-15/654964820_18100081612929231_3033901962968026251_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&_nc_map=urlgen_bucketless&ig_cache_key=MzMzNzY1NDM3MDcxNzk0MjYxNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=5ghvIE8qYvcQ7kNvwGW5Nhz&_nc_oc=Adp8lFopddLXtz0wvtn5Q5v7gNCQXNQn4xlcDS1rpdBrtsPXn9t_9RRdBbP9GGPCSp0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fafa1-1.fna&_nc_gid=pPxNopmGB30sw9p9pbOx2w&_nc_ss=7a22e&oh=00_AQJT5p8SuKenfTz7__r3RhwbyJj2EmI6wh4snl9E7lJwGg&oe=6AB8423C",
    size: "large",
  },
  {
    name: "DUO - Tienda online",
    category: "E-commerce",
    desc: "Plataforma de venta digital con experiencia de usuario optimizada.",
    img: "/img/screenshot-tiendanube-duo.png",
    url: "https://duoindumentaria.com.ar/",
    size: "small",
  },
  {
    name: "Lima",
    category: "Foto producto",
    desc: "Diseño y creación de imágenes de producto de alta calidad y optimización para redes sociales.",
    img: "/img/foto-producto-lima.jpg",
    url: "https://www.instagram.com/limaytela/",
    size: "small",
  },
  {
    name: "Posicionamiento web",
    category: "SEO / SEM",
    desc: "Sitio web optimizado para motores de búsqueda.",
    img: "/img/seo-sem-posicionamientoweb.png",
    size: "medium",
  },
  {
    name: "Moni Lorca",
    category: "Landing page",
    desc: "Página personalizada y destinada para promoción de servicio.",
    img: "/img/screenshot-landingpage-moni.png",
    size: "medium",
  },
];

/* ── Section wrappers ────────────────────────────── */
function RevealBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────── */
export default function Home() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [openService, setOpenService] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const goContact = () => {
    window.scrollTo(0, 0);
    navigate("/contact");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: "var(--c-bg)", color: "var(--c-fg)" }}>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
        {/* Background isotipo */}
        <div
          className="float-anim absolute right-[-8%] bottom-[-10%] md:right-[-4%] md:bottom-[-6%] pointer-events-none select-none opacity-10"
          style={{ width: "min(80vw, 600px)" }}
        >
          <UffoLogo fill="var(--c-fg)" />
        </div>

        {/* Accent dot (puntito verde) */}
        {/* <div
          className="absolute top-32 right-1/4 w-2 h-2 rounded-full pointer-events-none"
          style={{ backgroundColor: "var(--c-accent)" }}
        /> */}

        <div className="relative z-10 px-6 md:px-12 max-w-6xl">
          {/* Tag */}
          <div className="mb-8">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase py-1.5 px-3 theme-transition"
              style={{
                color: "var(--c-accent)",
                border: "1px solid var(--c-accent)",
              }}
            >
              Out of this world
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-bold leading-[0.92] tracking-tight text-[clamp(3.5rem,10vw,9rem)] uppercase mb-6"
            style={{ color: "var(--c-fg)" }}
          >
            <span className="block">Personas</span>
            <span className="block" style={{ color: "var(--c-accent)" }}>
              creando
            </span>
            <span className="block">para personas.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-sm font-bold tracking-widest uppercase mb-4"
            style={{ color: "var(--c-fg-sub)" }}
          >
            Esto es UFFO
          </p>

          <p
            className="text-base md:text-lg font-light max-w-xl mb-10 leading-relaxed"
            style={{ color: "var(--c-fg-sub)" }}
          >
            Creamos soluciones de diseño, tecnología y comunicación para transformar ideas en proyectos que generan valor.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={goContact}
              className="font-bold tracking-widest text-sm px-7 py-4 theme-transition"
              style={{ backgroundColor: "var(--c-accent)", color: "var(--c-accent-fg)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              COMENZAR PROYECTO →
            </button>
            <button
              onClick={() => scrollTo("trabajos")}
              className="font-bold tracking-widest text-sm px-7 py-4 theme-transition"
              style={{
                color: "var(--c-fg)",
                border: "1px solid var(--c-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--c-accent)";
                e.currentTarget.style.color = "var(--c-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--c-border)";
                e.currentTarget.style.color = "var(--c-fg)";
              }}
            >
              VER TRABAJOS →
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--c-fg-sub)" }}>
            scroll
          </span>
          <div
            className="w-px h-10"
            style={{ backgroundColor: "var(--c-border)" }}
          />
        </div>
      </section>

      {/* ── NOSOTROS ──────────────────────────────────── */}
      <section id="nosotros" className="py-28 md:py-40 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left */}
          <RevealBox>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-6"
              style={{ color: "var(--c-accent)" }}
            >
              Nosotros
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-8"
              style={{ color: "var(--c-fg)" }}
            >
              <br />
              Hacemos que las ideas funcionen.
            </h2>
          </RevealBox>

          {/* Right */}
          <RevealBox>
            <p
              className="text-base md:text-lg font-light leading-relaxed mb-8"
              style={{ color: "var(--c-fg-sub)" }}
            >
              Diseñamos desde Mendoza, impulsamos el potencial de marcas, proyectos y personas a través del diseño y la creatividad, buscando siempre soluciones que aporten valor real.
            </p>
            <p
              className="text-base md:text-lg font-light leading-relaxed mb-12"
              style={{ color: "var(--c-fg-sub)" }}
            >
              Cada proyecto tiene su propio desafío. Por eso nos involucramos profundamente, trabajando codo a codo con cada cliente para transformar una idea en una solución clara, funcional y original.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-px" style={{ backgroundColor: "var(--c-accent)" }} />
              <p
                className="text-xs font-bold tracking-[0.25em] uppercase"
                style={{ color: "var(--c-accent)" }}
              >
                Out of this world.
              </p>
            </div>
          </RevealBox>
        </div>

        {/* Isotipo decorativo */}
        <div className="max-w-6xl mx-auto mt-20">
          <RevealBox>
            <div className="flex items-center gap-6">
              <UffoLogo className="h-16 opacity-20" fill="var(--c-fg)" />
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "var(--c-border)" }}
              />
            </div>
          </RevealBox>
        </div>
      </section>

      {/* ── SERVICIOS ─────────────────────────────────── */}
      <section
        id="servicios"
        className="py-28 md:py-40 px-6 md:px-12"
        style={{ backgroundColor: "var(--c-bg-sec)" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBox>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--c-accent)" }}
            >
              Servicios
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold uppercase mb-16 md:mb-20"
              style={{ color: "var(--c-fg)" }}
            >
              ¿Qué podemos
              <br />
              crear juntos?
            </h2>
          </RevealBox>

          {/* List */}
          <div>
            {services.map((svc, i) => {
              const isOpen = openService === i;
              return (
                <div
                  key={i}
                  className="theme-transition"
                  style={{ borderTop: "1px solid var(--c-border)" }}
                >
                  <button
                    onClick={() => setOpenService(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between py-6 md:py-7 text-left group theme-transition"
                    onMouseEnter={(e) => {
                      const num = e.currentTarget.querySelector(".svc-num") as HTMLElement;
                      const name = e.currentTarget.querySelector(".svc-name") as HTMLElement;
                      if (num) num.style.color = "var(--c-accent)";
                      if (name) name.style.color = "var(--c-accent)";
                    }}
                    onMouseLeave={(e) => {
                      const num = e.currentTarget.querySelector(".svc-num") as HTMLElement;
                      const name = e.currentTarget.querySelector(".svc-name") as HTMLElement;
                      if (num) num.style.color = isOpen ? "var(--c-accent)" : "var(--c-fg-sub)";
                      if (name) name.style.color = isOpen ? "var(--c-accent)" : "var(--c-fg)";
                    }}
                  >
                    <div className="flex items-center gap-6 md:gap-10">
                      <span
                        className="svc-num text-xs font-bold tracking-widest theme-transition"
                        style={{ color: isOpen ? "var(--c-accent)" : "var(--c-fg-sub)" }}
                      >
                        {svc.num}
                      </span>
                      <span
                        className="svc-name text-xl md:text-3xl font-bold theme-transition"
                        style={{ color: isOpen ? "var(--c-accent)" : "var(--c-fg)" }}
                      >
                        {svc.name}
                      </span>
                    </div>
                    <span
                      className="text-xl theme-transition flex-shrink-0"
                      style={{
                        color: isOpen ? "var(--c-accent)" : "var(--c-fg-sub)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        display: "inline-block",
                      }}
                    >
                      +
                    </span>
                  </button>

                  {/* Expanded */}
                  <div
                    className="overflow-hidden theme-transition"
                    style={{
                      maxHeight: isOpen ? "200px" : "0",
                      opacity: isOpen ? 1 : 0,
                      transition: "max-height 0.4s ease, opacity 0.3s ease",
                    }}
                  >
                    <p
                      className="pb-8 pl-[4.5rem] md:pl-[6rem] max-w-2xl text-base font-light leading-relaxed"
                      style={{ color: "var(--c-fg-sub)" }}
                    >
                      {svc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
            {/* Last border */}
            <div style={{ borderTop: "1px solid var(--c-border)" }} />
          </div>
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────── */}
      <section className="py-28 md:py-40 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <RevealBox>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--c-accent)" }}
            >
              Proceso
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold uppercase mb-20"
              style={{ color: "var(--c-fg)" }}
            >
              De la idea al resultado.
            </h2>
          </RevealBox>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              { num: "01", title: "Nos contás", desc: "Conocemos tu idea, problema, objetivos y necesidades." },
              { num: "02", title: "Craneamos", desc: "Analizamos, pensamos alternativas y definimos la mejor estrategia." },
              { num: "03", title: "Diseñamos", desc: "Convertimos la estrategia en una solución visual, digital o tecnológica." },
              { num: "04", title: "Lanzamos", desc: "Entregamos, implementamos y acompañamos el proyecto." },
            ].map((step, i) => (
              <RevealBox key={i}>
                <div
                  className="py-10 pr-8 md:pr-12 theme-transition"
                  style={{ borderTop: "2px solid var(--c-border)" }}
                >
                  <span
                    className="block text-5xl md:text-6xl font-bold mb-6 leading-none"
                    style={{ color: "var(--c-accent)" }}
                  >
                    {step.num}
                  </span>
                  <span
                    className="block text-lg font-bold mb-3"
                    style={{ color: "var(--c-fg)" }}
                  >
                    {step.title}
                  </span>
                  <p
                    className="text-sm font-light leading-relaxed"
                    style={{ color: "var(--c-fg-sub)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </RevealBox>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRABAJOS ──────────────────────────────────── */}
      <section
        id="trabajos"
        className="py-28 md:py-40 px-6 md:px-12"
        style={{ backgroundColor: "var(--c-bg-sec)" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBox>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--c-accent)" }}
            >
              Trabajos
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold uppercase mb-16 md:mb-20"
              style={{ color: "var(--c-fg)" }}
            >
              Ideas hechas realidad.
            </h2>
          </RevealBox>

          {/* Editorial grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Large first item */}
            <RevealBox className="md:col-span-7">
              <WorkCard work={works[0]} />
            </RevealBox>
            <RevealBox className="md:col-span-5 flex flex-col gap-4 md:gap-6">
              <WorkCard work={works[1]} />
              <WorkCard work={works[2]} />
            </RevealBox>

            {/* Second row */}
            <RevealBox className="md:col-span-5">
              <WorkCard work={works[3]} />
            </RevealBox>
            <RevealBox className="md:col-span-7">
              <WorkCard work={works[4]} />
            </RevealBox>
          </div>
        </div>
      </section>

      {/* ── MANIFIESTO ────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-[0.03]"
            style={{ backgroundColor: "var(--c-accent)" }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBox>
            <div className="flex items-start gap-4 mb-8">
              <span
                className="text-5xl leading-none font-bold"
                style={{ color: "var(--c-accent)" }}
              >
                "
              </span>
            </div>
            <blockquote
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8"
              style={{ color: "var(--c-fg)" }}
            >
              El diseño es simple,
              <br />
              <span style={{ color: "var(--c-fg-sub)" }} className="font-light italic">
                por eso es tan complicado.
              </span>
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-10 h-px" style={{ backgroundColor: "var(--c-accent)" }} />
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "var(--c-fg-sub)" }}
              >
                Paul Rand
              </span>
            </div>
          </RevealBox>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section
        id="faq"
        className="py-28 md:py-40 px-6 md:px-12"
        style={{ backgroundColor: "var(--c-bg-sec)" }}
      >
        <div className="max-w-4xl mx-auto">
          <RevealBox>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--c-accent)" }}
            >
              FAQ
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold uppercase mb-16"
              style={{ color: "var(--c-fg)" }}
            >
              Preguntas frecuentes.
            </h2>
          </RevealBox>

          <div>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{ borderTop: "1px solid var(--c-border)" }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between py-6 text-left theme-transition"
                    onMouseEnter={(e) => {
                      const q = e.currentTarget.querySelector(".faq-q") as HTMLElement;
                      if (q) q.style.color = "var(--c-accent)";
                    }}
                    onMouseLeave={(e) => {
                      const q = e.currentTarget.querySelector(".faq-q") as HTMLElement;
                      if (q) q.style.color = isOpen ? "var(--c-accent)" : "var(--c-fg)";
                    }}
                  >
                    <span
                      className="faq-q text-base md:text-lg font-medium pr-8 theme-transition"
                      style={{ color: isOpen ? "var(--c-accent)" : "var(--c-fg)" }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className="theme-transition flex-shrink-0 text-lg mt-0.5"
                      style={{
                        color: isOpen ? "var(--c-accent)" : "var(--c-fg-sub)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        display: "inline-block",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "300px" : "0",
                      opacity: isOpen ? 1 : 0,
                      transition: "max-height 0.4s ease, opacity 0.3s ease",
                    }}
                  >
                    <p
                      className="pb-6 text-sm md:text-base font-light leading-relaxed max-w-2xl"
                      style={{ color: "var(--c-fg-sub)" }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
            <div style={{ borderTop: "1px solid var(--c-border)" }} />
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 relative overflow-hidden">
        {/* Bg isotipo */}
        <div
          className="absolute right-[-5%] top-1/2 -translate-y-1/2 pointer-events-none opacity-5 select-none"
          style={{ width: "min(70vw, 500px)" }}
        >
          <UffoLogo fill="var(--c-fg)" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <RevealBox>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight mb-6"
              style={{ color: "var(--c-fg)" }}
            >
              ¿Tenés algo
              <br />
              <span style={{ color: "var(--c-accent)" }}>en mente?</span>
            </h2>
            <p
              className="text-base md:text-lg font-light max-w-md mb-10"
              style={{ color: "var(--c-fg-sub)" }}
            >
              Contanos tu idea, nosotros le damos forma.
            </p>
            <button
              onClick={goContact}
              className="font-bold tracking-widest text-sm px-8 py-5 theme-transition"
              style={{ backgroundColor: "var(--c-accent)", color: "var(--c-accent-fg)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              COMENZAR PROYECTO →
            </button>
          </RevealBox>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ── Work card ───────────────────────────────────── */
function WorkCard({ work }: { work: (typeof works)[0] }) {
  const [hovered, setHovered] = useState(false);

  const openWork = () => {
    if (work.url) window.open(work.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="relative overflow-hidden group cursor-pointer theme-transition"
      style={{
        backgroundColor: "var(--c-card)",
        aspectRatio: "4/3",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={openWork}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openWork();
        }
      }}
      role={work.url ? "link" : undefined}
      tabIndex={work.url ? 0 : undefined}
      aria-label={work.url ? `Visitar ${work.name}` : undefined}
    >
      {/* Image */}
      <img
        src={work.img}
        alt={work.name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover theme-transition"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s ease" }}
      />

      {/* Desktop hover overlay */}
      <div
        className="absolute inset-0 hidden md:flex flex-col justify-end p-7 theme-transition"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      >
        <span
          className="text-xs font-bold tracking-widest uppercase mb-2"
          style={{ color: "var(--c-accent)" }}
        >
          {work.category}
        </span>
        <h3 className="text-xl font-bold text-white mb-1">{work.name}</h3>
        <p className="text-sm text-white/70 font-light">{work.desc}</p>
      </div>

      {/* Mobile overlay (always visible) */}
      <div
        className="absolute inset-0 flex md:hidden flex-col justify-end p-5"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)",
        }}
      >
        <span
          className="text-xs font-bold tracking-widest uppercase mb-1"
          style={{ color: "var(--c-accent)" }}
        >
          {work.category}
        </span>
        <h3 className="text-base font-bold text-white">{work.name}</h3>
      </div>
    </div>
  );
}
