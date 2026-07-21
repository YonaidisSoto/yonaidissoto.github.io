"use client";

import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { TokenGate } from "@/components/admin/TokenGate";
import { ListEditor } from "@/components/admin/ListEditor";
import { SiteInfoEditor } from "@/components/admin/SiteInfoEditor";
import { EducationEditor } from "@/components/admin/EducationEditor";
import { contentSections } from "@/lib/admin/schemas";
import { clearStoredToken } from "@/lib/github/client";
import { cn } from "@/lib/utils/cn";

const tabs = [
  { id: "site", label: "Site Info" },
  ...contentSections.map((section) => ({ id: section.id, label: section.label })),
  { id: "education", label: "Education & Stats" },
];

export function AdminShell() {
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("site");

  if (!token) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <TokenGate onAuthenticated={setToken} />
      </div>
    );
  }

  const activeSection = contentSections.find((section) => section.id === activeTab);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row">
      <aside className="lg:w-56 lg:flex-shrink-0">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "whitespace-nowrap rounded-lg px-3.5 py-2 text-left text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-navy-950 text-white dark:bg-accent-500 dark:text-navy-950"
                  : "text-slate-600 hover:bg-navy-950/5 dark:text-slate-300 dark:hover:bg-white/10"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => {
            clearStoredToken();
            setToken(null);
          }}
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-navy-950 dark:text-slate-400 dark:hover:text-white"
        >
          <FiLogOut className="h-3.5 w-3.5" />
          Cerrar sesión
        </button>
      </aside>

      <main className="flex-1">
        {activeTab === "site" && <SiteInfoEditor token={token} />}
        {activeTab === "education" && <EducationEditor token={token} />}
        {activeSection && <ListEditor section={activeSection} token={token} />}
      </main>
    </div>
  );
}
