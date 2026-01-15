import Link from "next/link";
import type { Listing } from "@prisma/client";

type Props = {
  listing: Listing;
};

export function ListingCard({ listing }: Props) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
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
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <svg
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={0.75}
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
      <div className="p-5">
        <h3 className="truncate text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {listing.title}
        </h3>
        <div className="mt-2.5 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {listing.haveCategory}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {listing.haveCondition}
          </span>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-emerald-50/50 p-2.5 -mx-0.5">
          <svg
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600"
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
          <p className="line-clamp-2 text-sm text-gray-700">
            {listing.wantText}
          </p>
        </div>
      </div>
    </Link>
  );
}
