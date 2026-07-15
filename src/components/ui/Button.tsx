import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500";

const variants = {
  primary:
    "bg-navy-950 text-white hover:bg-navy-800 dark:bg-accent-500 dark:text-navy-950 dark:hover:bg-accent-400 shadow-lg shadow-navy-950/10",
  secondary:
    "border border-navy-950/15 text-navy-950 hover:bg-navy-950/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10",
  ghost: "text-navy-950 hover:bg-navy-950/5 dark:text-white dark:hover:bg-white/10",
};

interface CommonProps {
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: LinkButtonProps) {
  return (
    <a href={href} className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
