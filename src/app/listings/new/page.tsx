"use client";

import { useActionState } from "react";
import { createListing } from "@/app/actions";

const CATEGORIES = ["Electronics", "Gaming", "Furniture", "Clothing", "Books", "Other"];
const CONDITIONS = ["New", "Like New", "Used", "For Parts"];

export default function NewListingPage() {
  const [state, formAction, isPending] = useActionState(createListing, {});

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Post a Trade</h1>
        <p className="mt-1 text-gray-500">Share what you have and what you're looking for.</p>
      </div>

      <form action={formAction} className="space-y-8">
        {state.error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">What do you have?</h2>
            <p className="mt-0.5 text-sm text-gray-500">Describe the item you want to trade.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-900">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., iPhone 14 Pro Max 256GB"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-900">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={4}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your item in detail - condition, features, any defects..."
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-900">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="haveCategory"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="mb-1.5 block text-sm font-medium text-gray-900">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  name="haveCondition"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-900">
                  Estimated Value ($)
                </label>
                <input
                  type="number"
                  name="haveEstimatedValue"
                  min="0"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-900">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City, State"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-900">
                Image URL
              </label>
              <input
                type="url"
                name="haveImageUrl"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1.5 text-xs text-gray-500">Paste a direct link to an image of your item.</p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">What do you want?</h2>
            <p className="mt-0.5 text-sm text-gray-500">Tell others what you're looking for in exchange.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-900">
                What are you looking for? <span className="text-red-500">*</span>
              </label>
              <textarea
                name="wantText"
                required
                rows={3}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., MacBook Pro, gaming laptop, or cash add..."
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-900">
                Tags
              </label>
              <input
                type="text"
                name="wantTags"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="laptop, macbook, gaming"
              />
              <p className="mt-1.5 text-xs text-gray-500">Comma-separated keywords to help others find your listing.</p>
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
        >
          {isPending ? "Posting..." : "Post Trade"}
        </button>
      </form>
    </div>
  );
}
