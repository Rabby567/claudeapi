// src/app/components/PromptForm.js
"use client";

import { useState, useRef } from "react";

function IconSparkle() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  );
}

function IconCopy() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3 py-1">
      {[85, 68, 90, 52].map((w, i) => (
        <div
          key={i}
          className="h-3 rounded-full"
          style={{
            width: `${w}%`,
            background: "linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)",
            backgroundSize: "200% 100%",
            animation: `shimmer 1.6s linear infinite`,
            animationDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function PromptForm() {
  const [prompt, setPrompt]       = useState("");
  const [response, setResponse]   = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState("");
  const [copied, setCopied]       = useState(false);
  const textareaRef               = useRef(null);

  const charCount = prompt.length;
  const charLimit = 4000;
  const nearLimit = charCount > charLimit * 0.85;
  const hasContent = prompt || response || error;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setResponse("");
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      const ct = res.headers.get("content-type") ?? "";
      if (!res.ok) {
        const data = ct.includes("application/json") ? await res.json() : {};
        throw new Error(data.error || "Request failed.");
      }
      setResponse(await res.text());
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit(e);
  };

  const handleCopy = async () => {
    if (!response) return;
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setPrompt(""); setResponse(""); setError(""); setCopied(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="space-y-5">

      {/* Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Claude anything…"
          rows={5}
          maxLength={charLimit}
          disabled={isLoading}
          aria-label="Prompt input"
          style={{ fontFamily: "'Sora', sans-serif" }}
          className="w-full resize-none rounded-2xl px-4 py-3 pb-8 bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm leading-relaxed outline-none transition-all duration-200 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <span
          className="absolute bottom-3 right-3 font-mono text-xs pointer-events-none transition-colors duration-200"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: nearLimit ? "#fbbf24" : "#475569",
            fontSize: "10px",
          }}
        >
          {charCount}/{charLimit}
        </span>
      </div>

      {/* Hint + actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#475569" }}>
          <kbd style={{
            display: "inline-block", padding: "2px 6px", borderRadius: "5px",
            background: "#1e293b", border: "1px solid #334155",
            color: "#64748b", fontSize: "10px", fontFamily: "inherit"
          }}>⌘ Enter</kbd>
          {" "}to generate
        </p>

        <div className="flex items-center gap-2">
          {hasContent && !isLoading && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-500 border border-slate-700 bg-transparent hover:text-slate-300 hover:border-slate-500 transition-all duration-150 cursor-pointer"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              ✕ Clear
            </button>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading || !prompt.trim()}
            aria-busy={isLoading}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer select-none"
            style={{
              fontFamily: "'Sora', sans-serif",
              boxShadow: isLoading ? "none" : "0 0 0 0 transparent",
            }}
            onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.boxShadow = "0 0 20px rgba(99,102,241,0.45)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
          >
            {isLoading ? (
              <>
                <span
                  className="block w-3.5 h-3.5 rounded-full border-2"
                  style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white", animation: "spin 0.75s linear infinite" }}
                />
                Generating…
              </>
            ) : (
              <><IconSparkle /> Generate</>
            )}
          </button>
        </div>
      </div>

      {/* Output panel */}
      {(isLoading || response || error) && (
        <div style={{ animation: "fadeUp 0.35s ease both" }} className="space-y-0">

          {/* Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-slate-800" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", color: "#475569", textTransform: "uppercase" }}>
              {isLoading ? (
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400" style={{ animation: "pulse-dot 1.2s ease-in-out infinite" }} />
                  Thinking
                </span>
              ) : error ? "Error" : "Response"}
            </span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Content card */}
          <div
            className="relative rounded-2xl border p-5 transition-all duration-300"
            style={{
              background: error ? "rgba(136,19,55,0.15)" : "#0f172a",
              borderColor: error ? "rgba(190,18,60,0.3)" : "#334155",
            }}
          >
            {isLoading && <Skeleton />}

            {!isLoading && error && (
              <div className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "#fca5a5" }}>
                <span style={{ color: "#f87171", marginTop: "2px", flexShrink: 0 }}>⚠</span>
                {error}
              </div>
            )}

            {!isLoading && response && (
              <>
                <button
                  onClick={handleCopy}
                  aria-label={copied ? "Copied!" : "Copy to clipboard"}
                  className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    background: copied ? "rgba(6,78,59,0.4)" : "#1e293b",
                    borderColor: copied ? "rgba(16,185,129,0.4)" : "#334155",
                    color: copied ? "#6ee7b7" : "#64748b",
                  }}
                >
                  {copied ? <><IconCheck /> Copied!</> : <><IconCopy /> Copy</>}
                </button>

                <div className="space-y-3 pr-20">
                  {response.split(/\n{2,}/).filter(Boolean).map((para, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed whitespace-pre-wrap"
                      style={{ color: "#cbd5e1", fontWeight: 300 }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Keyframe definitions injected once */}
      <style>{`
        @keyframes spin      { to { transform: rotate(360deg); } }
        @keyframes fadeUp    { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer   { from { background-position:200% 0; } to { background-position:-200% 0; } }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.3} }
      `}</style>
    </div>
  );
}
