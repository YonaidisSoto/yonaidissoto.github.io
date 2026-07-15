import { cn } from "@/lib/utils/cn";

interface AvatarPlaceholderProps {
  initials: string;
  className?: string;
}

// Placeholder for the professional photo.
// Replace with a Next.js <Image> pointing to /public/images/portrait.jpg once available.
export function AvatarPlaceholder({ initials, className }: AvatarPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br from-navy-700 via-navy-800 to-accent-600 font-display text-6xl font-bold text-white",
        className
      )}
      role="img"
      aria-label="Professional photo placeholder"
    >
      {initials}
    </div>
  );
}
