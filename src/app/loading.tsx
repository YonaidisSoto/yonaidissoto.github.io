export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-white dark:bg-navy-950"
      role="status"
      aria-label="Loading"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" />
    </div>
  );
}
