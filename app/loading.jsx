export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col items-center gap-4">
        <span className="h-12 w-12 rounded-full bg-liquid animate-liquid-spin" />
        <span className="text-sm text-slate-500">Loading…</span>
      </div>
    </div>
  );
}
