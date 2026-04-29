// src/app/layout.js
import "./globals.css";

export const metadata = {
  title: "Claude Studio — AI Prompt Interface",
  description: "A modern Next.js + Tailwind interface powered by Anthropic Claude.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
