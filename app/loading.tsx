export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="grid min-h-screen place-items-center">
      <div className="flex flex-col items-center gap-4">
        <span
          aria-hidden="true"
          className="h-12 w-12 rounded-full bg-liquid animate-liquid-spin"
        />
        <span className="text-sm text-muted">Loading…</span>
      </div>
    </div>
  );
}
