"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiSave, FiTrash2 } from "react-icons/fi";
import { getJsonFile, putJsonFile } from "@/lib/github/client";
import type { EducationItem, StatCounter } from "@/lib/types";

const FILE_PATH = "src/content/education.json";

interface EducationContent {
  items: EducationItem[];
  stats: StatCounter[];
}

export function EducationEditor({ token }: { token: string }) {
  const [data, setData] = useState<EducationContent | null>(null);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getJsonFile<EducationContent>(token, FILE_PATH)
      .then(({ data, sha }) => {
        if (cancelled) return;
        setData(data);
        setSha(sha);
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

  function updateItem(index: number, key: keyof EducationItem, value: string) {
    setData((prev) => {
      if (!prev) return prev;
      const items = [...prev.items];
      items[index] = { ...items[index]!, [key]: value };
      return { ...prev, items };
    });
  }

  function updateStat(index: number, key: keyof StatCounter, value: string) {
    setData((prev) => {
      if (!prev) return prev;
      const stats = [...prev.stats];
      const parsed = key === "value" ? Number(value) || 0 : value;
      stats[index] = { ...stats[index]!, [key]: parsed } as StatCounter;
      return { ...prev, stats };
    });
  }

  function addItem() {
    setData((prev) =>
      prev
        ? {
            ...prev,
            items: [...prev.items, { id: "", title: "", institution: "", period: "", description: "" }],
          }
        : prev
    );
  }

  function removeItem(index: number) {
    setData((prev) => (prev ? { ...prev, items: prev.items.filter((_, i) => i !== index) } : prev));
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setError(null);
    setSavedMessage(null);
    try {
      const result = await putJsonFile(token, FILE_PATH, data, sha, "Update education content via admin panel");
      setSha(result.sha);
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
          Education &amp; Stats
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

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Educación
      </h3>
      <div className="mt-3 space-y-4">
        {data.items.map((item, index) => (
          <div key={index} className="card-surface space-y-3 p-4">
            <div>
              <label className="text-sm font-medium text-navy-950 dark:text-white">Título</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(index, "title", e.target.value)}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-950 dark:text-white">Institución</label>
              <input
                type="text"
                value={item.institution}
                onChange={(e) => updateItem(index, "institution", e.target.value)}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-950 dark:text-white">Periodo</label>
              <input
                type="text"
                value={item.period}
                onChange={(e) => updateItem(index, "period", e.target.value)}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-950 dark:text-white">Descripción</label>
              <textarea
                rows={2}
                value={item.description ?? ""}
                onChange={(e) => updateItem(index, "description", e.target.value)}
                className={inputClasses}
              />
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
            >
              <FiTrash2 className="h-3.5 w-3.5" />
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1.5 rounded-full border border-navy-950/15 px-3.5 py-2 text-xs font-semibold text-navy-950 hover:bg-navy-950/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
        >
          <FiPlus className="h-3.5 w-3.5" />
          Agregar educación
        </button>
      </div>

      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Contadores animados (sección About)
      </h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {data.stats.map((stat, index) => (
          <div key={index} className="card-surface space-y-3 p-4">
            <div>
              <label className="text-sm font-medium text-navy-950 dark:text-white">Etiqueta</label>
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(index, "label", e.target.value)}
                className={inputClasses}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-navy-950 dark:text-white">Número</label>
                <input
                  type="number"
                  value={stat.value}
                  onChange={(e) => updateStat(index, "value", e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-navy-950 dark:text-white">Sufijo</label>
                <input
                  type="text"
                  value={stat.suffix ?? ""}
                  onChange={(e) => updateStat(index, "suffix", e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
