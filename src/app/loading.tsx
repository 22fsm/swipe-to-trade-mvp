export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="h-28 animate-pulse rounded-2xl bg-white/80 shadow-sm" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-white/80 shadow-sm">
            <div className="aspect-[4/3] animate-pulse bg-gray-200/70" />
            <div className="p-5 space-y-3">
              <div className="h-5 w-3/4 animate-pulse rounded-lg bg-gray-200/70" />
              <div className="h-4 w-1/2 animate-pulse rounded-lg bg-gray-200/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
