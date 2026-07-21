"use client";

import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { getJsonFile, putJsonFile } from "@/lib/github/client";
import type { SiteConfig } from "@/lib/data/site";

const FILE_PATH = "src/content/site.json";

export function SiteInfoEditor({ token }: { token: string }) {
  const [data, setData] = useState<SiteConfig | null>(null);
  const [sha, setSha] = useState("");
  const [keywordsText, setKeywordsText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getJsonFile<SiteConfig>(token, FILE_PATH)
      .then(({ data, sha }) => {
        if (cancelled) return;
        setData(data);
        setSha(sha);
        setKeywordsText(data.keywords.join("\n"));
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

  function updateField(key: keyof SiteConfig, value: string) {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateLink(key: keyof SiteConfig["links"], value: string) {
    setData((prev) => (prev ? { ...prev, links: { ...prev.links, [key]: value } } : prev));
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setError(null);
    setSavedMessage(null);
    const payload = {
      ...data,
      keywords: keywordsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };
    try {
      const result = await putJsonFile(token, FILE_PATH, payload, sha, "Update site info via admin panel");
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
        <h2 className="font-display text-xl font-semibold text-navy-950 dark:text-white">
          Información del sitio
        </h2>
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
          <label className="text-sm font-medium text-navy-950 dark:text-white">Nombre</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-950 dark:text-white">Título profesional</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-950 dark:text-white">
            Descripción (usada para SEO y redes sociales)
          </label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => updateField("description", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-950 dark:text-white">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-950 dark:text-white">LinkedIn</label>
          <input
            type="text"
            value={data.links.linkedin}
            onChange={(e) => updateLink("linkedin", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-950 dark:text-white">GitHub</label>
          <input
            type="text"
            value={data.links.github}
            onChange={(e) => updateLink("github", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-950 dark:text-white">
            Palabras clave de SEO (una por línea)
          </label>
          <textarea
            rows={6}
            value={keywordsText}
            onChange={(e) => setKeywordsText(e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>
    </div>
  );
}
