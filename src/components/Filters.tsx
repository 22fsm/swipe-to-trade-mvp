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
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
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
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <select
          value={currentCategory}
          onChange={(e) => updateFilters("category", e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
