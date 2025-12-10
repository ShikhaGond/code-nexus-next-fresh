"use client";

import { Edit, Trash2, Copy, Check, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

export default function CodeCard({ snippet, onEdit, onDelete, onAI }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black/40 border border-lime-400/20 rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <h3 className="text-lg text-lime-300 font-bold">{snippet.title}</h3>

        <div className="flex gap-2">
          <button onClick={onEdit} className="text-lime-400/60 hover:text-lime-300">
            <Edit size={16} />
          </button>

          <button onClick={onDelete} className="text-red-400/60 hover:text-red-300">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <pre className="bg-black/60 border border-lime-400/10 rounded p-3 mb-3 overflow-x-auto text-xs text-lime-200">
        {snippet.code}
      </pre>

      <button
        onClick={copyCode}
        className="px-3 py-1 bg-black/40 border border-lime-400/20 rounded text-lime-300 text-sm mb-3"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => onAI("explain")}
          className="flex-1 text-xs px-3 py-2 bg-purple-500/20 text-purple-300 rounded border border-purple-400/20"
        >
          <Sparkles size={14} /> Explain
        </button>

        <button
          onClick={() => onAI("optimize")}
          className="flex-1 text-xs px-3 py-2 bg-lime-500/20 text-lime-300 rounded border border-lime-400/20"
        >
          <Zap size={14} /> Optimize
        </button>
      </div>
    </div>
  );
}
