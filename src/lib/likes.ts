/**
 * Shared helper for managing liked listing IDs in localStorage.
 * Single source of truth for likes across SwipeUI and /liked page.
 */

export const LIKED_KEY = "swapspot_liked";

/**
 * Safely read liked IDs from localStorage.
 * Returns empty array if not available or invalid.
 */
export function getLikedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(LIKED_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

/**
 * Save liked IDs to localStorage.
 */
export function saveLikedIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LIKED_KEY, JSON.stringify(ids));
  } catch {
    // Storage might be full or disabled
  }
}

/**
 * Clear all liked IDs from localStorage.
 */
export function clearLikedIds(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LIKED_KEY);
  } catch {
    // Ignore
  }
}

/**
 * Reconcile liked IDs against current listing IDs.
 * Removes stale IDs that no longer exist in the database.
 * Returns the valid liked IDs and updates localStorage if any were removed.
 */
export function reconcileLikedIds(currentListingIds: string[]): string[] {
  const likedIds = getLikedIds();
  const currentIdSet = new Set(currentListingIds);
  const validLikedIds = likedIds.filter((id) => currentIdSet.has(id));

  // If any stale IDs were removed, update storage
  if (validLikedIds.length !== likedIds.length) {
    saveLikedIds(validLikedIds);
  }

  return validLikedIds;
}
