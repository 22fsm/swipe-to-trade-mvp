"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Listing } from "@prisma/client";

const LIKED_KEY = "swapspot_liked";

function getLikedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(LIKED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function removeLikedId(id: string) {
  const ids = getLikedIds().filter((likedId) => likedId !== id);
  localStorage.setItem(LIKED_KEY, JSON.stringify(ids));
  return ids;
}

export default function LikedPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Initialize client-side state after hydration
  useEffect(() => {
    // Defer initial state update to avoid synchronous cascading renders
    requestAnimationFrame(() => {
      const ids = getLikedIds();
      setLikedIds(ids);

      if (ids.length === 0) {
        setLoading(false);
        return;
      }

      fetch(`/api/listings?ids=${ids.join(",")}`)
        .then((res) => res.json())
        .then((data) => {
          setListings(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    });
  }, []);

  const handleRemove = (id: string) => {
    const newIds = removeLikedId(id);
    setLikedIds(newIds);
    setListings((prev) => prev.filter((listing) => listing.id !== id));
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50">
            <svg className="h-5 w-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Liked Items</h1>
            <p className="text-sm text-gray-500">{likedIds.length} item{likedIds.length !== 1 ? "s" : ""} saved</p>
          </div>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Swipe
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="rounded-2xl border border-gray-200/80 bg-white px-6 py-20 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
            <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">No liked items yet</h3>
          <p className="mt-2 text-gray-500 max-w-sm mx-auto">
            Start swiping to find trades you&apos;re interested in!
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg"
          >
            Start Swiping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-lg"
            >
              {/* Remove button */}
              <button
                onClick={() => handleRemove(listing.id)}
                className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-400 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-red-500"
                title="Remove from liked"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <Link href={`/listings/${listing.id}`}>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
