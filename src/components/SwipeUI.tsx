"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { Listing } from "@prisma/client";
import { reconcileLikedIds, saveLikedIds } from "@/lib/likes";

type Props = {
  listings: Listing[];
};

export function SwipeUI({ listings }: Props) {
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side state after hydration and reconcile stale IDs
  useEffect(() => {
    requestAnimationFrame(() => {
      const currentListingIds = listings.map((l) => l.id);
      const validLikedIds = reconcileLikedIds(currentListingIds);
      setLikedIds(validLikedIds);
      setIsClient(true);
    });
  }, [listings]);

  // Filter out liked items from the swipe stack
  // This is the key fix: liked items are permanently excluded
  const swipeableListings = useMemo(() => {
    if (!isClient) return listings; // During SSR, show all
    return listings.filter((listing) => !likedIds.includes(listing.id));
  }, [listings, likedIds, isClient]);

  const handleLike = () => {
    if (currentIndex >= swipeableListings.length) return;
    const listingId = swipeableListings[currentIndex].id;
    const newLikedIds = [...likedIds, listingId];
    setLikedIds(newLikedIds);
    saveLikedIds(newLikedIds);
    // Note: we don't increment currentIndex here because the liked item
    // will be filtered out, effectively advancing the stack automatically
  };

  const handlePass = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (!isClient) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
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
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">No listings yet</h2>
        <p className="mt-2 text-gray-500">Be the first to post a trade!</p>
        <Link
          href="/listings/new"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/30"
        >
          Post a Trade
        </Link>
      </div>
    );
  }

  // Check if we've seen all swipeable items
  if (currentIndex >= swipeableListings.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100">
          <svg
            className="h-10 w-10 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">You&apos;ve seen all listings!</h2>
        <p className="mt-2 text-gray-500">
          You liked {likedIds.length} item{likedIds.length !== 1 ? "s" : ""}.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {likedIds.length > 0 && (
            <Link
              href="/liked"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-pink-500/25 transition-all hover:shadow-lg"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              View Liked
            </Link>
          )}
          <Link
            href="/feed"
            className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
          >
            Browse All
          </Link>
          <button
            onClick={() => setCurrentIndex(0)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const listing = swipeableListings[currentIndex];
  const remainingCount = swipeableListings.length - currentIndex;

  return (
    <div className="flex flex-col items-center">
      {/* Progress indicator */}
      <div className="mb-4 flex items-center gap-3 text-sm text-gray-500">
        <span>{remainingCount} remaining</span>
        {likedIds.length > 0 && (
          <>
            <span className="text-gray-300">•</span>
            <Link href="/liked" className="flex items-center gap-1 text-pink-500 hover:text-pink-600 transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {likedIds.length} liked
            </Link>
          </>
        )}
      </div>

      {/* Swipe Card */}
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-lg">
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
            {listing.haveImageUrl ? (
              <img
                src={listing.haveImageUrl}
                alt={listing.title}
                className="h-full w-full object-cover"
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

          {/* Content */}
          <div className="p-5">
            <h2 className="text-xl font-bold text-gray-900">{listing.title}</h2>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {listing.haveCategory}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {listing.haveCondition}
              </span>
              {listing.haveEstimatedValue && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  ~${listing.haveEstimatedValue}
                </span>
              )}
            </div>

            <div className="mt-4 rounded-lg bg-emerald-50/50 p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
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
                Looking for:
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-gray-600">{listing.wantText}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {/* Pass Button */}
          <button
            onClick={handlePass}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-400 shadow-md transition-all hover:border-gray-300 hover:text-gray-500 hover:shadow-lg active:scale-95"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Details Button */}
          <Link
            href={`/listings/${listing.id}`}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-200 bg-white text-blue-500 shadow-md transition-all hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg active:scale-95"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>

          {/* Like Button */}
          <button
            onClick={handleLike}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-pink-200 bg-white text-pink-500 shadow-md transition-all hover:border-pink-300 hover:bg-pink-50 hover:shadow-lg active:scale-95"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Labels */}
        <div className="mt-3 flex items-center justify-center gap-14 text-xs text-gray-500">
          <span>Pass</span>
          <span>Details</span>
          <span>Like</span>
        </div>
      </div>
    </div>
  );
}
