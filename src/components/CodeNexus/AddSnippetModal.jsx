"use client";

import React, { useState, useMemo, useEffect } from "react";
import { X } from "lucide-react";

export default function AddSnippetModal({
  open,
  setOpen,
  snippets,
  setSnippets,
  editingId,
}) {
  const [form, setForm] = useState({
    title: "",
    code: "",
    language: "javascript",
    description: "",
    tags: [],
  });

  // -------- Get snippet being edited --------
  const editingSnippet = useMemo(() => {
    if (!editingId) return null;
    return snippets.find((s) => s.id === editingId) ?? null;
  }, [editingId, snippets]);

  // -------- Initialize form when modal opens --------
  useEffect(() => {
    if (!open) return;

    React.startTransition(() => {
      if (editingSnippet) {
        setForm({
          title: editingSnippet.title || "",
          code: editingSnippet.code || "",
          language: editingSnippet.language || "javascript",
          description: editingSnippet.description || "",
          tags: editingSnippet.tags || [],
        });
      } else {
        setForm({
          title: "",
          code: "",
          language: "javascript",
          description: "",
          tags: [],
        });
      }
    });
  }, [open, editingSnippet]);

  // -------- Save Snippet --------
  const saveSnippet = () => {
    if (!form.title || !form.code) return;

    const snippet = {
      ...form,
      id: editingId || Date.now(),
      createdAt: editingSnippet
        ? editingSnippet.createdAt
        : new Date().toISOString(),
    };

    if (editingId) {
      setSnippets((prev) =>
        prev.map((s) => (s.id === editingId ? snippet : s))
      );
    } else {
      setSnippets((prev) => [snippet, ...prev]);
    }

    setOpen(false);
  };

  // -------- Tag Handling --------
  const handleTagInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim().toLowerCase();
      if (!form.tags.includes(newTag)) {
        setForm((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      e.target.value = "";
    }
  };

  const removeTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  if (!open) return null;

  // -------- UI --------
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-lime-400/30 p-6 rounded-xl w-full max-w-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-lime-300">
            {editingId ? "Edit Snippet" : "Add Snippet"}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-lime-400/60 hover:text-lime-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full mb-4 px-4 py-2 bg-black/40 border border-lime-400/30 rounded-lg"
        />

        {/* Language */}
        <select
          value={form.language}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, language: e.target.value }))
          }
          className="w-full mb-4 px-4 py-2 bg-black/40 border border-lime-400/30 rounded-lg"
        >
          <option>javascript</option>
          <option>typescript</option>
          <option>react</option>
          <option>python</option>
          <option>css</option>
          <option>html</option>
        </select>

        {/* Code Field */}
        <textarea
          placeholder="Write your code..."
          value={form.code}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, code: e.target.value }))
          }
          className="w-full mb-4 px-4 py-2 min-h-[160px] bg-black/40 border border-lime-400/30 rounded-lg font-mono"
        />

        {/* Description */}
        <textarea
          placeholder="What does this snippet do?"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full mb-4 px-4 py-2 bg-black/40 border border-lime-400/30 rounded-lg"
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="Add tags… (press Enter)"
          onKeyDown={handleTagInput}
          className="w-full mb-2 px-4 py-2 bg-black/40 border border-lime-400/30 rounded-lg"
        />

        <div className="flex flex-wrap gap-2 mb-4">
          {form.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 border border-purple-400/40 rounded-full flex items-center gap-1"
            >
              #{tag}
              <button onClick={() => removeTag(tag)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={saveSnippet}
          className="w-full bg-lime-400 text-black font-bold py-3 rounded-lg hover:scale-105 transition"
        >
          {editingId ? "Update Snippet" : "Add Snippet"}
        </button>
      </div>
    </div>
  );
}
