import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
        <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900">Not Found</h2>
      <p className="mt-2 text-gray-500 max-w-sm mx-auto">Could not find the requested resource.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:from-blue-600 hover:to-blue-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
    </div>
  );
}
