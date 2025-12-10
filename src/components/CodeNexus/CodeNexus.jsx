"use client";

import React, { useState, useEffect, useMemo } from "react";
import CodeCard from "./CodeCard";
import AddSnippetModal from "./AddSnippetModal";
import AiModal from "./AiModal";

export default function CodeNexus() {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [aiSnippet, setAiSnippet] = useState(null);
  const [aiAction, setAiAction] = useState(null);

  // ========= Load Snippets from localStorage =========
  useEffect(() => {
    try {
      const stored = localStorage.getItem("codeNexusSnippets");
      if (stored) {
        React.startTransition(() => {
          setSnippets(JSON.parse(stored));
        });
      }
    } catch (_) {}
  }, []);

  // ========= Save Snippets to localStorage =========
  useEffect(() => {
    localStorage.setItem("codeNexusSnippets", JSON.stringify(snippets));
  }, [snippets]);

  // ========= Filter + Sort Snippets =========
  const filteredSnippets = useMemo(() => {
    return snippets
      .filter((s) => {
        const matchesSearch =
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.tags.some((t) =>
            t.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const matchesLang =
          selectedLanguage === "all" || s.language === selectedLanguage;

        return matchesSearch && matchesLang;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [snippets, searchTerm, selectedLanguage]);

  // ========= Handle AI Modal =========
  const openAiModal = (snippet, action) => {
    setAiSnippet(snippet);
    setAiAction(action);
    setAiModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">

      {/* Title */}
      <h1 className="text-4xl font-bold text-lime-400">CodeNexus</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search snippets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 bg-black/40 border border-lime-400/30 rounded-lg"
      />

      {/* Filters + Add Button */}
      <div className="flex items-center gap-4">

        {/* Language Filter */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-3 py-2 bg-black/40 border border-lime-400/30 rounded-lg"
        >
          <option value="all">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="react">React</option>
          <option value="python">Python</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
        </select>

        {/* Add Button */}
        <button
          onClick={() => {
            setEditingId(null);
            setAddModalOpen(true);
          }}
          className="px-4 py-2 bg-lime-400 text-black font-bold rounded-lg hover:scale-105 transition"
        >
          + Add Snippet
        </button>

      </div>

      {/* Snippets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSnippets.map((snippet) => (
          <CodeCard
            key={snippet.id}
            snippet={snippet}
            onEdit={() => {
              setEditingId(snippet.id);
              setAddModalOpen(true);
            }}
            onDelete={() =>
              setSnippets((prev) => prev.filter((s) => s.id !== snippet.id))
            }
            onAI={(action) => openAiModal(snippet, action)}
          />
        ))}
      </div>

      {/* Modals */}
      <AddSnippetModal
        open={addModalOpen}
        setOpen={setAddModalOpen}
        snippets={snippets}
        setSnippets={setSnippets}
        editingId={editingId}
      />

      <AiModal
        open={aiModalOpen}
        setOpen={setAiModalOpen}
        snippet={aiSnippet}
        action={aiAction}
      />

    </div>
  );
}
