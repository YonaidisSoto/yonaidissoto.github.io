import { FiCpu, FiZap, FiHome, FiCode, FiUsers } from "react-icons/fi";
import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    icon: FiCpu,
    skills: [
      "Prompt Engineering",
      "Generative AI",
      "OpenAI API",
      "ChatGPT",
      "AI Content Editing",
      "AI Solutions Design",
    ],
  },
  {
    id: "automation",
    title: "Automation",
    icon: FiZap,
    skills: [
      "n8n",
      "Make",
      "Zapier",
      "Workflow Design",
      "API Integration",
      "Webhooks",
      "No-Code / Low-Code",
    ],
  },
  {
    id: "hospitality",
    title: "Hospitality",
    icon: FiHome,
    skills: [
      "Front Office Operations",
      "Oracle OPERA Cloud PMS",
      "Guest Experience",
      "Reservations Management",
      "Hotel Operations",
    ],
  },
  {
    id: "development",
    title: "Development",
    icon: FiCode,
    skills: ["JavaScript / TypeScript", "REST APIs", "Next.js", "Git / GitHub", "JSON & Data Mapping"],
  },
  {
    id: "soft-skills",
    title: "Soft Skills",
    icon: FiUsers,
    skills: [
      "Process Improvement",
      "Problem Solving",
      "Cross-team Communication",
      "Attention to Detail",
      "Continuous Learning",
    ],
  },
];
