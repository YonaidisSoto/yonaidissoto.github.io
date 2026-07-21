"use client";

import { useEffect, useState } from "react";
import { FiKey } from "react-icons/fi";
import { getStoredToken, setStoredToken, verifyToken } from "@/lib/github/client";

interface TokenGateProps {
  onAuthenticated: (token: string) => void;
}

export function TokenGate({ onAuthenticated }: TokenGateProps) {
  const [tokenInput, setTokenInput] = useState("");
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const stored = getStoredToken();
    if (!stored) {
      setChecking(false);
      return;
    }
    verifyToken(stored)
      .then(() => onAuthenticated(stored))
      .catch(() => {
        setError("El token guardado ya no es válido. Ingresa uno nuevo.");
        setChecking(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setVerifying(true);
    setError(null);
    try {
      await verifyToken(tokenInput.trim());
      setStoredToken(tokenInput.trim());
      onAuthenticated(tokenInput.trim());
    } catch {
      setError("Ese token no funcionó. Revisa que lo copiaste completo y que tiene permiso de escritura sobre este repositorio.");
    } finally {
      setVerifying(false);
    }
  }

  if (checking) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">Verificando sesión…</p>;
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-950/5 text-navy-950 dark:bg-white/10 dark:text-accent-300">
          <FiKey className="h-5 w-5" />
        </div>
        <h1 className="font-display text-xl font-semibold text-navy-950 dark:text-white">
          Acceso al panel de edición
        </h1>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Pega aquí tu GitHub Personal Access Token (solo se guarda en este navegador, nunca
        se envía a ningún lado excepto directamente a GitHub). Si todavía no tienes uno,
        sigue la guía <code>GUIA-DE-EDICION.md</code> en el repositorio para crearlo.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="password"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
          placeholder="github_pat_..."
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none transition-colors focus:border-accent-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
        />
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={verifying}
          className="w-full rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50 dark:bg-accent-500 dark:text-navy-950 dark:hover:bg-accent-400"
        >
          {verifying ? "Verificando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
