import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ListingCard } from "@/components/ListingCard";
import { Filters } from "@/components/Filters";

type Props = {
  searchParams: Promise<{ search?: string; category?: string; condition?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const search = (params.search ?? "").toString() || undefined;
  const category = (params.category ?? "").toString() || undefined;
  const condition = (params.condition ?? "").toString() || undefined;

  const whereClause: Parameters<typeof prisma.listing.findMany>[0]["where"] = {};

  if (search) {
    whereClause.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { wantText: { contains: search } },
    ];
  }
  if (category && category !== "All") {
    whereClause.haveCategory = category;
  }
  if (condition && condition !== "All") {
    whereClause.haveCondition = condition;
  }

  const listings = await prisma.listing.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <Suspense fallback={<div className="h-24 animate-pulse rounded-xl bg-gray-200" />}>
        <Filters />
      </Suspense>

      {listings.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {search ? "No results found" : "No listings yet"}
          </h3>
          <p className="mt-1 text-gray-500">
            {search
              ? `No listings match "${search}". Try different keywords.`
              : "Be the first to post a trade!"}
          </p>
          {!search && (
            <Link
              href="/listings/new"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Post a Trade
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
