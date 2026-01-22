/**
 * Client-side helpers for managing likes via the database API.
 * Uses clientId stored in localStorage to identify the browser/device.
 */

const CLIENT_ID_KEY = "swapspot_clientId";

/**
 * Get the clientId from localStorage.
 * Returns null if not set.
 */
export function getClientId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CLIENT_ID_KEY);
  } catch {
    return null;
  }
}

/**
 * Save the clientId to localStorage.
 */
export function saveClientId(clientId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CLIENT_ID_KEY, clientId);
  } catch {
    // Storage might be full or disabled
  }
}

/**
 * Ensure a client session exists.
 * If clientId is already in localStorage and valid, returns it.
 * Otherwise creates a new session and stores it.
 */
export async function ensureClientSession(): Promise<string> {
  const existing = getClientId();

  const res = await fetch("/api/client-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId: existing }),
  });

  // Defensive: check response status
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Client session API error: ${res.status} - ${text || "Unknown error"}`);
  }

  // Defensive: check content-type
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text().catch(() => "");
    throw new Error(`Client session API returned non-JSON: ${contentType} - ${text.slice(0, 100)}`);
  }

  // Defensive: handle empty body
  const text = await res.text();
  if (!text) {
    throw new Error("Client session API returned empty response");
  }

  let data: { clientId?: string };
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Client session API returned invalid JSON: ${text.slice(0, 100)}`);
  }

  const clientId = data.clientId;
  if (!clientId || typeof clientId !== "string") {
    throw new Error("Client session API did not return a valid clientId");
  }

  // Save (or re-save) the clientId
  saveClientId(clientId);

  return clientId;
}

/**
 * Fetch liked listing IDs from the database for the given clientId.
 */
export async function fetchLikedIds(clientId: string): Promise<string[]> {
  const res = await fetch(`/api/likes?clientId=${encodeURIComponent(clientId)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.likedIds || [];
}

/**
 * Like a listing.
 */
export async function likeListing(
  clientId: string,
  listingId: string
): Promise<boolean> {
  const res = await fetch("/api/likes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId, listingId }),
  });
  return res.ok;
}

/**
 * Unlike a listing.
 */
export async function unlikeListing(
  clientId: string,
  listingId: string
): Promise<boolean> {
  const res = await fetch("/api/likes", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId, listingId }),
  });
  return res.ok;
}

/**
 * Clear all likes for a client.
 */
export async function clearAllLikes(clientId: string): Promise<boolean> {
  const res = await fetch("/api/likes", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId, clearAll: true }),
  });
  return res.ok;
}
