import { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import { Language, LanguageContext, translations, useLanguage } from "./i18n";

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
  const { copy, language } = useLanguage();

  useEffect(() => {
    const isContactPage = location.pathname === "/contact";
    const title = isContactPage ? copy.metadata.contactTitle : copy.metadata.homeTitle;
    const description = isContactPage ? copy.metadata.contactDescription : copy.metadata.homeDescription;

    document.title = title;
    document.documentElement.lang = language;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    window.gtag?.("event", "page_view", {
      page_title: title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
    });
  }, [copy, language, location.pathname, location.search]);

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
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = window.localStorage.getItem("uffo-language");
    if (savedLanguage === "es" || savedLanguage === "en") return savedLanguage;
    return navigator.languages.some((locale) => locale.toLowerCase().startsWith("en")) ? "en" : "es";
  });

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("uffo-language", nextLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, copy: translations[language] }}>
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
    </LanguageContext.Provider>
  );
}
