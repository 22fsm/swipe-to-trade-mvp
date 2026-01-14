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
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-6 w-6 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-emerald-800">Proposal sent!</p>
        <p className="mt-1 text-sm text-emerald-600">
          The owner will contact you if interested.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Make a Proposal</h2>
      <p className="mt-0.5 text-sm text-gray-500">Interested in this trade? Send your offer.</p>

      <form action={formAction} className="mt-5 space-y-4">
        <input type="hidden" name="listingId" value={listingId} />

        {state.error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-900">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="proposerName"
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-900">
            Contact (Email or Phone) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="proposerContact"
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-900">
            Your Offer <span className="text-red-500">*</span>
          </label>
          <textarea
            name="offerText"
            required
            rows={3}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe what you're offering in exchange..."
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
        >
          {isPending ? "Sending..." : "Send Proposal"}
        </button>
      </form>
    </div>
  );
}
