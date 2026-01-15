"use client";

import { useActionState } from "react";
import { createProposal } from "@/app/actions";

type Props = {
  listingId: string;
};

export function ProposalForm({ listingId }: Props) {
  const [state, formAction, isPending] = useActionState(createProposal, {});

  if (state.success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 shadow-sm">
          <svg
            className="h-7 w-7 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-emerald-800">Proposal sent!</p>
        <p className="mt-1 text-sm text-emerald-600">
          The owner will contact you if interested.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Make a Proposal</h2>
          <p className="text-sm text-gray-500">Interested in this trade? Send your offer.</p>
        </div>
      </div>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="listingId" value={listingId} />

        {state.error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 flex items-center gap-2">
            <svg className="h-4 w-4 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {state.error}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="proposerName"
            required
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Contact (Email or Phone) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="proposerContact"
            required
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Your Offer <span className="text-red-500">*</span>
          </label>
          <textarea
            name="offerText"
            required
            rows={3}
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="Describe what you're offering in exchange..."
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-3 font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Sending..." : "Send Proposal"}
        </button>
      </form>
    </div>
  );
}
