export type FieldType = "text" | "textarea" | "lines" | "select-icon" | "select" | "checkbox";

export interface FieldSchema {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  hint?: string;
}

export interface ContentSection {
  id: string;
  label: string;
  filePath: string;
  fields: FieldSchema[];
  emptyItem: () => Record<string, unknown>;
}

const statusOptions = ["completed", "in-progress", "planned"];

export const contentSections: ContentSection[] = [
  {
    id: "services",
    label: "Services",
    filePath: "src/content/services.json",
    fields: [
      { key: "id", label: "ID (único, minúsculas y guiones)", type: "text" },
      { key: "title", label: "Título", type: "text" },
      { key: "description", label: "Descripción", type: "textarea" },
      { key: "icon", label: "Ícono", type: "select-icon" },
      { key: "keywords", label: "Palabras clave (una por línea)", type: "lines" },
    ],
    emptyItem: () => ({
      id: "",
      title: "",
      description: "",
      icon: "cpu",
      keywords: [],
    }),
  },
  {
    id: "projects",
    label: "Projects",
    filePath: "src/content/projects.json",
    fields: [
      { key: "id", label: "ID (único, minúsculas y guiones)", type: "text" },
      { key: "title", label: "Título", type: "text" },
      { key: "problem", label: "Problema", type: "textarea" },
      { key: "solution", label: "Solución", type: "textarea" },
      { key: "technologies", label: "Tecnologías (una por línea)", type: "lines" },
      { key: "results", label: "Resultados (uno por línea)", type: "lines" },
      { key: "githubUrl", label: "Link de GitHub (opcional)", type: "text" },
      { key: "demoUrl", label: "Link de demo (opcional)", type: "text" },
      {
        key: "gradient",
        label: "Gradiente de fondo (avanzado, dejar como está si no sabes Tailwind)",
        type: "text",
        hint: "Ej: from-navy-700 via-navy-600 to-accent-600",
      },
    ],
    emptyItem: () => ({
      id: "",
      title: "",
      problem: "",
      solution: "",
      technologies: [],
      results: [],
      githubUrl: "",
      demoUrl: "",
      gradient: "from-navy-700 via-navy-600 to-accent-600",
    }),
  },
  {
    id: "skills",
    label: "Skills",
    filePath: "src/content/skills.json",
    fields: [
      { key: "id", label: "ID (único, minúsculas y guiones)", type: "text" },
      { key: "title", label: "Título del grupo", type: "text" },
      { key: "icon", label: "Ícono", type: "select-icon" },
      { key: "skills", label: "Habilidades (una por línea)", type: "lines" },
    ],
    emptyItem: () => ({ id: "", title: "", icon: "cpu", skills: [] }),
  },
  {
    id: "experience",
    label: "Experience",
    filePath: "src/content/experience.json",
    fields: [
      { key: "id", label: "ID (único, minúsculas y guiones)", type: "text" },
      { key: "role", label: "Puesto", type: "text" },
      { key: "organization", label: "Empresa / organización", type: "text" },
      { key: "period", label: "Periodo (ej. 2024 — Present)", type: "text" },
      { key: "location", label: "Ubicación", type: "text" },
      { key: "description", label: "Descripción (una línea por punto)", type: "lines" },
      { key: "current", label: "¿Trabajo actual?", type: "checkbox" },
    ],
    emptyItem: () => ({
      id: "",
      role: "",
      organization: "",
      period: "",
      location: "",
      description: [],
      current: false,
    }),
  },
  {
    id: "certifications",
    label: "Certifications",
    filePath: "src/content/certifications.json",
    fields: [
      { key: "id", label: "ID (único, minúsculas y guiones)", type: "text" },
      { key: "title", label: "Título", type: "text" },
      { key: "issuer", label: "Emisor", type: "text" },
      { key: "date", label: "Año", type: "text" },
      { key: "status", label: "Estado", type: "select", options: statusOptions },
      { key: "credentialUrl", label: "Link de la credencial (opcional)", type: "text" },
    ],
    emptyItem: () => ({
      id: "",
      title: "",
      issuer: "",
      date: "",
      status: "completed",
      credentialUrl: "",
    }),
  },
  {
    id: "nav",
    label: "Menú de navegación",
    filePath: "src/content/nav.json",
    fields: [
      { key: "label", label: "Texto del link", type: "text" },
      {
        key: "href",
        label: "Destino (ej. #about)",
        type: "text",
        hint: "Debe empezar con # y coincidir con una sección existente del sitio",
      },
    ],
    emptyItem: () => ({ label: "", href: "#" }),
  },
];
