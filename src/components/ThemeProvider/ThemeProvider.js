"use client";
import React from "react";
import Cookies from "js-cookie";

const ThemeContext = React.createContext(null);

function getBrowserTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ initialTheme, children }) {
  const [theme, setTheme] = React.useState(initialTheme);
  const [systemTheme, setSystemTheme] = React.useState("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setSystemTheme(getBrowserTheme());
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setSystemTheme(getBrowserTheme());
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const resolvedTheme =
    theme === "system" ? (mounted ? systemTheme : null) : theme;

  function toggleTheme() {
    const nextTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    Cookies.set("theme", nextTheme, { expires: 365, sameSite: "Lax" });
  }

  return (
    <ThemeContext.Provider value={{ resolvedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
