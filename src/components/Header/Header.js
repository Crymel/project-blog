"use client";
import React from "react";
import clsx from "clsx";
import { Rss } from "react-feather";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";

import dynamic from "next/dynamic";

const ThemeButton = dynamic(() => import("@/components/ThemeButton"), {
  ssr: false,
  loading: () => <button className={styles.action} />,
});

function Header({ className, ...delegated }) {
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <ThemeButton />
      </div>
    </header>
  );
}

export default Header;
