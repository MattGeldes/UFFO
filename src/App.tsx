import { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/* ── Theme context ───────────────────────────────── */
interface ThemeCtx {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeCtx>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

/* ── Layout with Navbar ──────────────────────────── */
function Layout() {
  const location = useLocation();

  useEffect(() => {
    const isContactPage = location.pathname === "/contact";
    const title = isContactPage ? "Contacto | UFFO Studios" : "UFFO studios";
    const description = isContactPage
      ? "Contale tu idea a UFFO Studios y comencemos a cranear tu próximo proyecto."
      : "UFFO Studios diseña marcas, experiencias digitales y soluciones creativas desde Mendoza para el mundo.";

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    window.gtag?.("event", "page_view", {
      page_title: title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
    });
  }, [location.pathname, location.search]);

  return (
    <>
      <Navbar />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

/* ── App ─────────────────────────────────────────── */
export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`${theme === "light" ? "light" : ""} theme-transition`}
        style={{ minHeight: "100vh" }}
      >
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}
