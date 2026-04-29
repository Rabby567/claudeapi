// src/app/page.js
import PromptForm from "./components/PromptForm";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">

      {/* Background glow blobs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div style={{ position:"absolute", top:"-160px", left:"-160px", width:"600px", height:"600px", borderRadius:"50%", background:"rgba(99,102,241,0.10)", filter:"blur(120px)" }} />
        <div style={{ position:"absolute", bottom:"-200px", right:"-160px", width:"700px", height:"700px", borderRadius:"50%", background:"rgba(139,92,246,0.08)", filter:"blur(140px)" }} />
      </div>

      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          opacity: 0.025,
          backgroundImage: "linear-gradient(#6366f1 1px,transparent 1px),linear-gradient(90deg,#6366f1 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Page content */}
      <div className="relative z-10 w-full flex flex-col gap-8" style={{ maxWidth: "640px" }}>

        {/* Header */}
        <header className="text-center flex flex-col items-center gap-4">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-widest"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              borderRadius: "99px",
              border: "1px solid rgba(99,102,241,0.35)",
              background: "rgba(99,102,241,0.1)",
              color: "#818cf8",
              letterSpacing: "0.12em",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400"
              style={{ animation: "pulse-dot 1.4s ease-in-out infinite" }}
            />
            Powered by Claude
          </div>

          {/* Title */}
          <h1
            className="font-bold tracking-tight text-white"
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2.2rem, 7vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            Claude{" "}
            <span style={{ background: "linear-gradient(135deg, #818cf8, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Studio
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-slate-400 font-light leading-relaxed" style={{ maxWidth: "40ch", fontFamily: "'Sora', sans-serif" }}>
            A minimal AI prompt interface built on{" "}
            <span className="text-slate-300">Next.js</span> and the{" "}
            <span className="text-slate-300">Anthropic Claude API</span>.
          </p>
        </header>

        {/* Card */}
        <div
          className="w-full p-6 sm:p-8"
          style={{
            borderRadius: "24px",
            border: "1px solid #1e293b",
            background: "rgba(10,16,31,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 0 0 1px rgba(99,102,241,0.05), 0 32px 64px rgba(0,0,0,0.5)",
          }}
        >
          <PromptForm />
        </div>

        {/* Footer */}
        <footer
          className="text-center"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#334155" }}
        >
          <span>Built with </span>
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" style={{ color: "#475569", textDecoration: "underline" }}>Next.js</a>
          <span> &amp; </span>
          <a href="https://anthropic.com" target="_blank" rel="noopener noreferrer" style={{ color: "#475569", textDecoration: "underline" }}>Anthropic</a>
        </footer>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.3} }
      `}</style>
    </main>
  );
}
