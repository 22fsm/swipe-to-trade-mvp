import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProposalForm } from "./ProposalForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ListingPage({ params }: Props) {
  const { id } = await params;

  const listing = await prisma.listing.findUnique({
    where: { id },
  });

  if (!listing) {
    notFound();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 shadow-sm">
          {listing.haveImageUrl ? (
            <img
              src={listing.haveImageUrl}
              alt={listing.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-300">
              <svg
                className="h-24 w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={0.5}
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

        <div className="mt-6 rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm lg:hidden">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{listing.title}</h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-700">
              {listing.haveCategory}
            </span>
            <span className="rounded-full bg-gray-100 px-3.5 py-1.5 text-sm font-medium text-gray-600">
              {listing.haveCondition}
            </span>
            {listing.haveEstimatedValue && (
              <span className="rounded-full bg-emerald-50 px-3.5 py-1.5 text-sm font-medium text-emerald-700">
                ~${listing.haveEstimatedValue}
              </span>
            )}
          </div>

          {listing.location && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {listing.location}
            </div>
          )}

          <p className="mt-5 leading-relaxed text-gray-700">{listing.description}</p>

          <div className="mt-6 rounded-xl bg-emerald-50/50 p-4">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-emerald-600"
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
              <h2 className="font-semibold text-gray-900">Looking for</h2>
            </div>
            <p className="mt-2 leading-relaxed text-gray-700">{listing.wantText}</p>
            {listing.wantTags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {listing.wantTags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6 lg:col-span-2">
        <div className="hidden lg:block rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{listing.title}</h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-700">
              {listing.haveCategory}
            </span>
            <span className="rounded-full bg-gray-100 px-3.5 py-1.5 text-sm font-medium text-gray-600">
              {listing.haveCondition}
            </span>
            {listing.haveEstimatedValue && (
              <span className="rounded-full bg-emerald-50 px-3.5 py-1.5 text-sm font-medium text-emerald-700">
                ~${listing.haveEstimatedValue}
              </span>
            )}
          </div>

          {listing.location && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {listing.location}
            </div>
          )}

          <p className="mt-5 leading-relaxed text-gray-700">{listing.description}</p>

          <div className="mt-6 rounded-xl bg-emerald-50/50 p-4">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-emerald-600"
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
              <h2 className="font-semibold text-gray-900">Looking for</h2>
            </div>
            <p className="mt-2 leading-relaxed text-gray-700">{listing.wantText}</p>
            {listing.wantTags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {listing.wantTags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <ProposalForm listingId={listing.id} haveEstimatedValue={listing.haveEstimatedValue} />

        {/* View Proposals Link */}
        <Link
          href={`/listings/${listing.id}/proposals`}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-300"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          View Proposals
        </Link>
      </div>
    </div>
  );
}
