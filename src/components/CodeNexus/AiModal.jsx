"use client";

import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function AiModal({ open, setOpen, snippet, action }) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (!open || !snippet) return;
    setLoading(true);
    setResponse("");

    const promptMap = {
      explain: `Explain this ${snippet.language} code:\n${snippet.code}`,
      optimize: `Optimize this ${snippet.language} code:\n${snippet.code}`
    };

    async function fetchAI() {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            messages: [{ role: "user", content: promptMap[action] }],
            max_tokens: 600
          })
        });

        const json = await res.json();
        setResponse(json.content?.[0]?.text || "AI reply unavailable");
      } catch {
        setResponse("AI request failed.");
      } finally {
        setLoading(false);
      }
    }

    fetchAI();
  }, [open, action, snippet]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-purple-400/30 p-6 rounded-xl max-w-2xl w-full">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl text-purple-300 font-bold">AI Assistant</h2>
          <button onClick={() => setOpen(false)} className="text-purple-400/60">
            <X />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="w-10 h-10 text-purple-300 animate-spin" />
            <p className="mt-4 text-purple-300">Analyzing...</p>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap p-4 bg-black/40 rounded border border-purple-400/20 text-purple-200">
            {response}
          </pre>
        )}
      </div>
    </div>
  );
}
