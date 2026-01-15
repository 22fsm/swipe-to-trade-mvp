"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CATEGORIES = ["All", "Electronics", "Gaming", "Furniture", "Clothing", "Books", "Other"];
const CONDITIONS = ["All", "New", "Like New", "Used", "For Parts"];

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "All";
  const currentCondition = searchParams.get("condition") || "All";

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "All") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search listings..."
          defaultValue={currentSearch}
          onChange={(e) => updateFilters("search", e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-12 pr-4 text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <select
          value={currentCategory}
          onChange={(e) => updateFilters("category", e.target.value)}
          className="rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>
        <select
          value={currentCondition}
          onChange={(e) => updateFilters("condition", e.target.value)}
          className="rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          {CONDITIONS.map((cond) => (
            <option key={cond} value={cond}>
              {cond === "All" ? "All Conditions" : cond}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
