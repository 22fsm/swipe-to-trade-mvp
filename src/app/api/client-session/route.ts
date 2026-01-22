import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/client-session
 * Creates a new client session or returns existing one if clientId provided.
 * Always returns JSON: { clientId: string } or { error: string }.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { clientId } = body as { clientId?: string };

    // If clientId provided, check if it exists
    if (clientId) {
      const existing = await prisma.clientSession.findUnique({
        where: { id: clientId },
      });
      if (existing) {
        return NextResponse.json({ clientId: existing.id });
      }
    }

    // Create a new session
    const session = await prisma.clientSession.create({
      data: {},
    });

    return NextResponse.json({ clientId: session.id });
  } catch (err) {
    console.error("Error in /api/client-session:", err);
    return NextResponse.json(
      { error: "Failed to create or retrieve client session" },
      { status: 500 }
    );
  }
}
