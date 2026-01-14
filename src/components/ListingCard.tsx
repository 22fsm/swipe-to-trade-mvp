import Link from "next/link";
import type { Listing } from "@prisma/client";

type Props = {
  listing: Listing;
};

export function ListingCard({ listing }: Props) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        {listing.haveImageUrl ? (
          <img
            src={listing.haveImageUrl}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/400x300?text=No+Image";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="truncate text-base font-semibold text-gray-900 group-hover:text-blue-600">
          {listing.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {listing.haveCategory}
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {listing.haveCondition}
          </span>
        </div>
        <div className="mt-3 flex items-start gap-1.5">
          <svg
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          <p className="line-clamp-2 text-sm text-gray-600">
            {listing.wantText}
          </p>
        </div>
      </div>
    </Link>
  );
}
