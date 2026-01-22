import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/likes?clientId=xxx
 * Returns array of listing IDs that the client has liked
 */
export async function GET(request: NextRequest) {
  const clientId = request.nextUrl.searchParams.get("clientId");

  if (!clientId) {
    return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
  }

  const likes = await prisma.like.findMany({
    where: { clientId },
    select: { listingId: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ likedIds: likes.map((l) => l.listingId) });
}

/**
 * POST /api/likes
 * Like a listing: { clientId, listingId }
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { clientId, listingId } = body as {
    clientId?: string;
    listingId?: string;
  };

  if (!clientId || !listingId) {
    return NextResponse.json(
      { error: "Missing clientId or listingId" },
      { status: 400 }
    );
  }

  // Verify client session exists
  const session = await prisma.clientSession.findUnique({
    where: { id: clientId },
  });
  if (!session) {
    return NextResponse.json(
      { error: "Invalid clientId" },
      { status: 400 }
    );
  }

  // Verify listing exists
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });
  if (!listing) {
    return NextResponse.json(
      { error: "Listing not found" },
      { status: 404 }
    );
  }

  // Upsert the like (ignore if already exists)
  await prisma.like.upsert({
    where: {
      clientId_listingId: { clientId, listingId },
    },
    create: { clientId, listingId },
    update: {},
  });

  return NextResponse.json({ success: true });
}

/**
 * DELETE /api/likes
 * Unlike a listing: { clientId, listingId }
 * Or clear all: { clientId, clearAll: true }
 */
export async function DELETE(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { clientId, listingId, clearAll } = body as {
    clientId?: string;
    listingId?: string;
    clearAll?: boolean;
  };

  if (!clientId) {
    return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
  }

  if (clearAll) {
    await prisma.like.deleteMany({
      where: { clientId },
    });
    return NextResponse.json({ success: true });
  }

  if (!listingId) {
    return NextResponse.json(
      { error: "Missing listingId" },
      { status: 400 }
    );
  }

  await prisma.like.deleteMany({
    where: { clientId, listingId },
  });

  return NextResponse.json({ success: true });
}
