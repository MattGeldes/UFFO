import { useNavigate, useLocation } from "react-router-dom";
import UffoLogo from "./UffoLogo";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="theme-transition pt-20 pb-10 px-6 md:px-12"
      style={{
        backgroundColor: "var(--c-bg-sec)",
        borderTop: "1px solid var(--c-border)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-5">
              <UffoLogo className="h-8 w-auto" />
              <span className="font-bold text-base tracking-tight" style={{ color: "var(--c-fg)" }}>
                UFFO studios
              </span>
            </div>
            <p className="text-sm font-medium mb-2" style={{ color: "var(--c-fg)" }}>
              Personas creando para personas.
            </p>
            <p className="text-sm" style={{ color: "var(--c-fg-sub)" }}>
              San Rafael, Mendoza, Argentina.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--c-fg-sub)" }}>
              Navegación
            </p>
            {[
              { label: "Inicio", action: goHome },
              { label: "Nosotros", action: () => scrollTo("nosotros") },
              { label: "Servicios", action: () => scrollTo("servicios") },
              { label: "Trabajos", action: () => scrollTo("trabajos") },
              { label: "FAQ", action: () => scrollTo("faq") },
              {
                label: "Contacto",
                action: () => {
                  window.scrollTo(0, 0);
                  navigate("/contact");
                },
              },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="text-left text-sm theme-transition"
                style={{ color: "var(--c-fg-sub)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-fg-sub)")}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--c-fg-sub)" }}>
              Redes
            </p>
              {[
                { label: "Instagram", href: "https://www.instagram.com/uffostudios/" },
                { label: "Behance", href: "https://www.behance.net/uffo" },
                { label: "TikTok", href: "https://www.tiktok.com/@uffostudios" },
                { label: "Pinterest", href: "https://ar.pinterest.com/uffostudios/" },
              ].map(({ label, href }) => (
              <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                className="text-sm theme-transition"
                style={{ color: "var(--c-fg-sub)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-fg-sub)")}
              >
                  {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: "1px solid var(--c-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--c-fg-sub)" }}>
            © {new Date().getFullYear()} UFFO studios. Todos los derechos reservados.
          </p>
          <p className="text-xs" style={{ color: "var(--c-fg-sub)" }}>
            Diseñado por{" "}
            <span className="font-medium" style={{ color: "var(--c-fg)" }}>
              UFFO studios
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
