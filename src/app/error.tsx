"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 px-6 py-12 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
        <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-red-800">Something went wrong!</h2>
      <p className="mt-2 text-sm text-red-600 max-w-sm mx-auto">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/25 transition-all hover:bg-red-700 hover:shadow-lg"
      >
        Try again
      </button>
    </div>
  );
}
