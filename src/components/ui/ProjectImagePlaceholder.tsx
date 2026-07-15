import { FiCpu } from "react-icons/fi";
import { cn } from "@/lib/utils/cn";

interface ProjectImagePlaceholderProps {
  gradient: string;
  title: string;
  className?: string;
}

// Placeholder project thumbnail. Replace with a real screenshot via
// Next.js <Image src="/images/projects/<slug>.png" /> when available.
export function ProjectImagePlaceholder({
  gradient,
  title,
  className,
}: ProjectImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        gradient,
        className
      )}
      role="img"
      aria-label={`${title} project preview placeholder`}
    >
      <div className="absolute inset-0 bg-grid-slate opacity-30" />
      <FiCpu className="relative h-12 w-12 text-white/80" />
    </div>
  );
}
