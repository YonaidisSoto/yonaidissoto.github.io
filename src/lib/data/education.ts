import educationContent from "@/content/education.json";
import type { EducationItem, StatCounter } from "@/lib/types";

export const educationItems = educationContent.items as EducationItem[];
export const statCounters = educationContent.stats as StatCounter[];
