import { prisma } from "@/lib/prisma";
import { SwipeUI } from "@/components/SwipeUI";

export default async function SwipePage() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <SwipeUI listings={listings} />;
}
