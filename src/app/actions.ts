"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type CreateListingState = {
  error?: string;
};

export async function createListing(
  _prevState: CreateListingState,
  formData: FormData
): Promise<CreateListingState> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const haveCategory = formData.get("haveCategory") as string;
  const haveCondition = formData.get("haveCondition") as string;
  const haveEstimatedValue = formData.get("haveEstimatedValue") as string;
  const haveImageUrl = formData.get("haveImageUrl") as string;
  const wantText = formData.get("wantText") as string;
  const wantTags = formData.get("wantTags") as string;
  const location = formData.get("location") as string;

  if (!title || !description || !haveCategory || !haveCondition || !wantText) {
    return { error: "Please fill in all required fields." };
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      haveCategory,
      haveCondition,
      haveEstimatedValue: haveEstimatedValue ? parseInt(haveEstimatedValue) : null,
      haveImageUrl: haveImageUrl || null,
      wantText,
      wantTags: wantTags || "",
      location: location || null,
    },
  });

  revalidatePath("/");
  redirect(`/listings/${listing.id}`);
}

type CreateProposalState = {
  error?: string;
  success?: boolean;
};

export async function createProposal(
  _prevState: CreateProposalState,
  formData: FormData
): Promise<CreateProposalState> {
  const listingId = formData.get("listingId") as string;
  const proposerName = formData.get("proposerName") as string;
  const proposerContact = formData.get("proposerContact") as string;
  const offerText = formData.get("offerText") as string;

  if (!proposerName || !proposerContact || !offerText) {
    return { error: "Please fill in all required fields." };
  }

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!listing) {
    return { error: "Listing not found." };
  }

  await prisma.proposal.create({
    data: {
      listingId,
      proposerName,
      proposerContact,
      offerText,
    },
  });

  revalidatePath(`/listings/${listingId}`);
  return { success: true };
}
