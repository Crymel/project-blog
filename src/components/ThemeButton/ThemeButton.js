"use client";
import React from "react";
import { Sun, Moon } from "react-feather";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import styles from "./ThemeButton.module.css";
import Cookies from "js-cookie";

function getBrowserTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  Cookies.set("theme", theme, { expires: 365, sameSite: "Lax" });
}

function ThemeButton() {
  const [theme, setTheme] = React.useState("system");
  const [systemTheme, setSystemTheme] = React.useState(getBrowserTheme);

  React.useEffect(() => {
    setTheme(Cookies.get("theme") ?? "system");
  }, []);

  React.useEffect(() => {
    const updateSystemTheme = () => setSystemTheme(getBrowserTheme());
    const themeChangeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    themeChangeMediaQuery.addEventListener("change", updateSystemTheme);

    return () => {
      themeChangeMediaQuery.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  function toggleTheme() {
    const nextTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button className={styles.action} onClick={toggleTheme}>
      {resolvedTheme === "light" ? (
        <Sun size="1.5rem" />
      ) : (
        <Moon size="1.5rem" />
      )}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default ThemeButton;
