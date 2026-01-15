"use client";

import { useActionState } from "react";
import { createListing } from "@/app/actions";

const CATEGORIES = ["Electronics", "Gaming", "Furniture", "Clothing", "Books", "Other"];
const CONDITIONS = ["New", "Like New", "Used", "For Parts"];

export default function NewListingPage() {
  const [state, formAction, isPending] = useActionState(createListing, {});

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">Post a Trade</h1>
        <p className="mt-2 text-slate-200">Share what you have and what you're looking for.</p>
      </div>

      <form action={formAction} className="space-y-8">
        {state.error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center gap-3">
            <svg className="h-5 w-5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {state.error}
          </div>
        )}

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">What do you have?</h2>
              <p className="text-sm text-gray-500">Describe the item you want to trade.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="e.g., iPhone 14 Pro Max 256GB"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={4}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Describe your item in detail - condition, features, any defects..."
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="haveCategory"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  name="haveCondition"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Select condition</option>
                  {CONDITIONS.map((cond) => (
                    <option key={cond} value={cond}>
                      {cond}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Estimated Value ($)
                </label>
                <input
                  type="number"
                  name="haveEstimatedValue"
                  min="0"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="City, State"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="haveImageUrl"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-2 text-xs text-gray-500">Paste a direct link to an image of your item.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">What do you want?</h2>
              <p className="text-sm text-gray-500">Tell others what you're looking for in exchange.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                What are you looking for? <span className="text-red-500">*</span>
              </label>
              <textarea
                name="wantText"
                required
                rows={3}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="e.g., MacBook Pro, gaming laptop, or cash add..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                name="wantTags"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="laptop, macbook, gaming"
              />
              <p className="mt-2 text-xs text-gray-500">Comma-separated keywords to help others find your listing.</p>
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Posting..." : "Post Trade"}
        </button>
      </form>
    </div>
  );
}
