// src/app/api/generate/route.js
// Server-side only — ANTHROPIC_API_KEY is never sent to the browser.

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return new Response(
        JSON.stringify({ error: "Prompt must be a non-empty string." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const message = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt.trim() }],
    });

    const text =
      message.content?.[0]?.type === "text"
        ? message.content[0].text
        : "No response generated.";

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    console.error("Anthropic API error:", err);
    const status = err?.status ?? 500;
    const msg =
      status === 401 ? "Invalid API key. Check your ANTHROPIC_API_KEY."
      : status === 429 ? "Rate limit hit. Please wait and try again."
      : "Something went wrong. Please try again.";

    return new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}
