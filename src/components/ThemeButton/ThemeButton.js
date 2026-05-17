"use client";
import React from "react";
import { Sun, Moon } from "react-feather";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import styles from "./ThemeButton.module.css";
import { useTheme } from "@/components/ThemeProvider";

function ThemeButton() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button className={styles.action} onClick={toggleTheme}>
      {resolvedTheme === "dark" && <Moon size="1.5rem" />}
      {resolvedTheme === "light" && <Sun size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default ThemeButton;
