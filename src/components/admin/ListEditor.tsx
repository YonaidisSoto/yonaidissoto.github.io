"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiSave, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import type { ContentSection } from "@/lib/admin/schemas";
import { getJsonFile, putJsonFile } from "@/lib/github/client";
import { iconRegistry } from "@/lib/iconRegistry";

interface ListEditorProps {
  section: ContentSection;
  token: string;
}

type Item = Record<string, unknown>;

export function ListEditor({ section, token }: ListEditorProps) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [sha, setSha] = useState<string>("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getJsonFile<Item[]>(token, section.filePath)
      .then(({ data, sha }) => {
        if (cancelled) return;
        setItems(data);
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
  }, [section.filePath, token]);

  function updateField(index: number, key: string, value: unknown) {
    setItems((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  }

  function addItem() {
    setOpenIndex((items ?? []).length);
    setItems((prev) => [...(prev ?? []), section.emptyItem()]);
  }

  function removeItem(index: number) {
    setItems((prev) => (prev ? prev.filter((_, i) => i !== index) : prev));
    setOpenIndex(null);
  }

  async function handleSave() {
    if (!items) return;
    setSaving(true);
    setError(null);
    setSavedMessage(null);
    try {
      const result = await putJsonFile(
        token,
        section.filePath,
        items,
        sha,
        `Update ${section.label} content via admin panel`
      );
      setSha(result.sha);
      setSavedMessage("Guardado. El sitio se actualizará en 1-2 minutos.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">Cargando {section.label}…</p>;
  }

  if (error && !items) {
    return <p className="text-sm text-red-600 dark:text-red-400">{error}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-navy-950 dark:text-white">
          {section.label}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1.5 rounded-full border border-navy-950/15 px-3.5 py-2 text-xs font-semibold text-navy-950 hover:bg-navy-950/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            <FiPlus className="h-3.5 w-3.5" />
            Agregar
          </button>
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
      </div>

      {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
      {savedMessage && (
        <p className="mt-3 text-sm text-green-700 dark:text-green-400">{savedMessage}</p>
      )}

      <div className="mt-6 space-y-3">
        {items?.map((item, index) => {
          const isOpen = openIndex === index;
          const titleValue =
            (item.title as string) || (item.role as string) || (item.label as string) || `Elemento ${index + 1}`;
          return (
            <div key={index} className="card-surface overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left"
              >
                <span className="font-medium text-navy-950 dark:text-white">{titleValue}</span>
                {isOpen ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
              </button>

              {isOpen && (
                <div className="space-y-4 border-t border-slate-200/70 p-4 dark:border-white/10">
                  {section.fields.map((field) => (
                    <FieldInput
                      key={field.key}
                      field={field}
                      value={item[field.key]}
                      onChange={(value) => updateField(index, field.key, value)}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                  >
                    <FiTrash2 className="h-3.5 w-3.5" />
                    Eliminar este elemento
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {items?.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No hay elementos todavía. Haz clic en &quot;Agregar&quot; para crear el primero.
          </p>
        )}
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: ContentSection["fields"][number];
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const inputClasses =
    "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none transition-colors focus:border-accent-500 dark:border-white/10 dark:bg-navy-800 dark:text-white";

  return (
    <div>
      <label className="text-sm font-medium text-navy-950 dark:text-white">{field.label}</label>
      {field.hint && (
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{field.hint}</p>
      )}

      {field.type === "text" && (
        <input
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          rows={3}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        />
      )}

      {field.type === "lines" && (
        <textarea
          rows={4}
          value={Array.isArray(value) ? (value as string[]).join("\n") : ""}
          onChange={(e) =>
            onChange(
              e.target.value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
            )
          }
          className={inputClasses}
        />
      )}

      {field.type === "select-icon" && (
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        >
          {Object.keys(iconRegistry).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      )}

      {field.type === "select" && (
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        >
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {field.type === "checkbox" && (
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-2 h-4 w-4 rounded border-slate-300"
        />
      )}
    </div>
  );
}
