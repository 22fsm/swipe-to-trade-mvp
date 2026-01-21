import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProposalsPage({ params }: Props) {
  const { id } = await params;

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      proposals: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!listing) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href={`/listings/${id}`}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to listing
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Proposals for &ldquo;{listing.title}&rdquo;</h1>
          <p className="mt-1 text-sm text-gray-500">
            {listing.proposals.length} proposal{listing.proposals.length !== 1 ? "s" : ""} received
          </p>
        </div>
      </div>

      {/* Proposals List */}
      {listing.proposals.length === 0 ? (
        <div className="rounded-2xl border border-gray-200/80 bg-white px-6 py-20 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
            <svg
              className="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">No proposals yet</h3>
          <p className="mt-2 text-gray-500 max-w-sm mx-auto">
            Share your listing to get trade proposals from interested people.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {listing.proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm">
                    {proposal.proposerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{proposal.proposerName}</h3>
                    <p className="text-sm text-gray-500">{proposal.proposerContact}</p>
                  </div>
                </div>
                <time className="text-xs text-gray-400">
                  {new Date(proposal.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              <div className="mt-4 rounded-xl bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <svg
                    className="h-4 w-4 text-emerald-600"
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
                  Their Offer
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{proposal.offerText}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
