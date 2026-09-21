import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../App";
import UffoLogo from "./UffoLogo";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (id: string) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/contact");
  };

  return (
    <>
      <header
        className="theme-transition fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: scrolled ? "var(--c-bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--c-border)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-[68px]">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <UffoLogo className="h-7 w-auto" />
            <span
              className="font-bold text-base tracking-tight leading-none"
              style={{ color: "var(--c-fg)", fontFamily: "Rubik, sans-serif" }}
            >
              UFFO studios
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["nosotros", "servicios", "trabajos", "faq"].map((id) => (
              <button
                key={id}
                onClick={() => handleAnchorClick(id)}
                className="text-sm font-medium capitalize tracking-wide theme-transition"
                style={{ color: "var(--c-fg-sub)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-fg)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-fg-sub)")}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="text-lg theme-transition w-8 h-8 flex items-center justify-center rounded-full"
              style={{
                color: "var(--c-fg-sub)",
                border: "1px solid var(--c-border)",
              }}
              title={theme === "dark" ? "Cambiar a Light Mode" : "Cambiar a Dark Mode"}
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>

            {/* CTA */}
            <button
              onClick={handleContactClick}
              className="text-sm font-bold tracking-widest px-5 py-2.5 theme-transition"
              style={{
                backgroundColor: "var(--c-accent)",
                color: "var(--c-accent-fg)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              COMENZAR PROYECTO →
            </button>
          </nav>

          {/* Mobile: hamburger */}
          <button
            className="flex md:hidden flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
            aria-expanded={menuOpen}
          >
            <span
              className="block w-6 h-0.5 theme-transition"
              style={{
                backgroundColor: "var(--c-fg)",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }}
            />
            <span
              className="block w-6 h-0.5 theme-transition"
              style={{
                backgroundColor: "var(--c-fg)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 theme-transition"
              style={{
                backgroundColor: "var(--c-fg)",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden theme-transition"
        style={{
          backgroundColor: "var(--c-bg)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s ease, opacity 0.35s ease",
        }}
      >
        <div className="flex flex-col justify-center h-full px-8 gap-10 pt-20">
          {[
            { label: "Nosotros", id: "nosotros" },
            { label: "Servicios", id: "servicios" },
            { label: "Trabajos", id: "trabajos" },
            { label: "FAQ", id: "faq" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleAnchorClick(id)}
              className="text-left text-4xl font-bold tracking-tight theme-transition"
              style={{ color: "var(--c-fg)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-fg)")}
            >
              {label}
            </button>
          ))}

          <button
            onClick={handleContactClick}
            className="text-left text-4xl font-bold tracking-tight"
            style={{ color: "var(--c-accent)" }}
          >
            Comenzar proyecto
          </button>

          {/* Theme toggle in mobile */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => { toggleTheme(); }}
              className="flex items-center gap-3 text-sm font-medium theme-transition"
              style={{ color: "var(--c-fg-sub)" }}
            >
              {theme === "dark" ? "☀ Light Mode" : "☾ Dark Mode"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
