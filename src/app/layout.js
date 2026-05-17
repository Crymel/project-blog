import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";
import { cookies } from "next/headers";

import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RespectMotionPreference from "@/components/RespectMotionPreference";

import "./styles.css";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

async function RootLayout({ children }) {
  const theme = (await cookies()).get("theme")?.value ?? "system";

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-theme={theme === "system" ? undefined : theme}
    >
      <body>
        <ThemeProvider initialTheme={theme}>
          <RespectMotionPreference>
            <Header />
            <main>{children}</main>
            <Footer />
          </RespectMotionPreference>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
