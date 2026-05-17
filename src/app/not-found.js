import React from "react";
import { BLOG_TITLE } from "@/constants";

export const metadata = {
  title: `404 Not Found • ${BLOG_TITLE}`,
  description: `This page does not exist.`,
};

async function NotFound() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ marginBlockEnd: "1.5rem" }}>404 Not Found</h1>
      <p>This page does not exist. Please check the URL and try again.</p>
    </div>
  );
}
export default NotFound;
