"use client";

import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { getJsonFile, putJsonFile } from "@/lib/github/client";
import type { AboutContent } from "@/lib/types";

const FILE_PATH = "src/content/about.json";

export function AboutEditor({ token }: { token: string }) {
  const [data, setData] = useState<AboutContent | null>(null);
  const [sha, setSha] = useState("");
  const [paragraphsText, setParagraphsText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getJsonFile<AboutContent>(token, FILE_PATH)
      .then(({ data, sha }) => {
        if (cancelled) return;
        setData(data);
        setSha(sha);
        setParagraphsText(data.paragraphs.join("\n\n"));
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "No se pudo cargar el contenido.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  function updateField(key: keyof Omit<AboutContent, "paragraphs">, value: string) {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setError(null);
    setSavedMessage(null);
    const payload: AboutContent = {
      ...data,
      paragraphs: paragraphsText
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean),
    };
    try {
      const result = await putJsonFile(token, FILE_PATH, payload, sha, "Update About content via admin panel");
      setSha(result.sha);
      setData(payload);
      setSavedMessage("Guardado. El sitio se actualizará en 1-2 minutos.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  }

  const inputClasses =
    "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none transition-colors focus:border-accent-500 dark:border-white/10 dark:bg-navy-800 dark:text-white";

  if (loading) return <p className="text-sm text-slate-500 dark:text-slate-400">Cargando…</p>;
  if (error && !data) return <p className="text-sm text-red-600 dark:text-red-400">{error}</p>;
  if (!data) return null;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-navy-950 dark:text-white">About</h2>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-full bg-navy-950 px-3.5 py-2 text-xs font-semibold text-white hover:bg-navy-800 disabled:opacity-50 dark:bg-accent-500 dark:text-navy-950 dark:hover:bg-accent-400"
        >
          <FiSave className="h-3.5 w-3.5" />
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
      {savedMessage && (
        <p className="mt-3 text-sm text-green-700 dark:text-green-400">{savedMessage}</p>
      )}

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-navy-950 dark:text-white">
            Etiqueta pequeña (eyebrow)
          </label>
          <input
            type="text"
            value={data.eyebrow}
            onChange={(e) => updateField("eyebrow", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-950 dark:text-white">Título</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-950 dark:text-white">Subtítulo</label>
          <textarea
            rows={2}
            value={data.description}
            onChange={(e) => updateField("description", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-950 dark:text-white">
            Párrafos de la biografía
          </label>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Deja una línea completamente vacía entre cada párrafo.
          </p>
          <textarea
            rows={10}
            value={paragraphsText}
            onChange={(e) => setParagraphsText(e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>
    </div>
  );
}
