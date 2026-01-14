import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
      <h2 className="text-lg font-semibold text-gray-900">Listing Not Found</h2>
      <p className="mt-2 text-gray-600">
        This listing may have been removed or the link is incorrect.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Browse Listings
      </Link>
    </div>
  );
}
