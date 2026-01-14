# MVP Plan — Swipe-to-Trade (Mini)

## Goal
Build a minimal marketplace MVP where users can post trade listings with "HAVE" and "WANT", browse/search listings, view details, and create trade proposals (stored only).

## Core Features (MVP)
1. **Listings Feed (Home)**
   - Browse/Scroll recent listings.
   - Search by title, description, or want items.
   - Filter by Category and Condition.
2. **Create Listing**
   - Simple form to post items.
   - Image URL support (no file upload).
3. **Listing Details**
   - Full view of "HAVE" and "WANT".
   - Proposal form to contact owner.
4. **Trade Proposal**
   - Create a proposal linked to a listing.
   - Basic contact info collection.

## Non-Goals (Explicitly out of scope for v1)
- Authentication / User Profiles.
- Payments / Transactions.
- Chat / Real-time messaging.
- Image file uploads (URLs only for now).
- Matching algorithm / swiping mechanics.
- Proposal management dashboard (proposals go into a "black box" / DB for now).

## Data Model (Prisma + SQLite)

### Listing
- `id` (UUID)
- `title` (String)
- `description` (String)
- `haveCategory` (String)  // e.g., Electronics, Gaming, Furniture
- `haveCondition` (String) // New, Like New, Used, For parts
- `haveEstimatedValue` (Int?)
- `haveImageUrl` (String?) // External URL
- `wantText` (String)      // Free text: "iPhone 13, cash add..."
- `wantTags` (String)      // Comma-separated tags
- `location` (String?)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Proposal
- `id` (UUID)
- `listing` (Listing @relation)
- `listingId` (Foreign Key)
- `proposerName` (String)
- `proposerContact` (String) // Email/Phone
- `offerText` (String)       // Details of the offer
- `createdAt` (DateTime)

## Project Structure (Minimal)
```
/
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── src/
│   ├── app/
│   │   ├── loading.tsx      # Global loading state
│   │   ├── error.tsx        # Global error boundary
│   │   ├── layout.tsx       # Main layout (Header/Footer)
│   │   ├── page.tsx         # Listings feed (Home)
│   │   ├── listings/
│   │   │   ├── new/
│   │   │   │   └── page.tsx # Create listing form
│   │   │   └── [id]/
│   │   │       └── page.tsx # Listing details + Proposal form
│   │   └── actions.ts       # Server Actions (createListing, createProposal)
│   ├── components/
│   │   ├── ui/              # Reusable atoms (Button, Input, Badge)
│   │   ├── ListingCard.tsx  # Feed item component
│   │   ├── Filters.tsx      # Search/Category/Condition inputs
│   │   └── Navbar.tsx       # Global navigation
│   └── lib/
│       ├── prisma.ts        # Prisma client singleton
│       └── utils.ts         # Helper functions
```

## UI Layout Plan
- **Global Layout**:
  - **Header**: Logo (Left), "Post a Trade" Button (Right) - Sticky top.
  - **Main**: Centered container, max-width-screen-lg, subtle background color.
  - **Footer**: Simple text info.

- **Pages**:
  - **Home (Feed)**:
    - Top: Search bar + Filter chips (horizontal scroll on mobile).
    - Grid: 1 col (mobile) / 2-3 cols (desktop) of ListingCards.
    - Card: Image (top), Title, badges for Category/Condition, "Wants: ..." snippet.
  - **Create Listing**:
    - Single column form card.
    - Fields grouped: "What do you have?" vs "What do you want?".
  - **Listing Details**:
    - Split view (Desktop): Left = Image, Right = Details + Proposal Form.
    - Stacked (Mobile): Image -> Info -> Proposal Form.

## Edge Cases & Error Handling
- **Empty States**:
  - Feed: "No listings found. Be the first to post!"
  - Search: "No results for '{query}'. Try different keywords."
- **404 Handling**: A user visits `/listings/invalid-id` -> Show "Listing not found" custom UI.
- **Validation**:
  - Required fields: Title, Description, Want Text, Contact Info (for proposals).
  - Invalid Image URL: listing should still render (use default placeholder if load fails).
- **Loading States**:
  - Skeleton loaders for feed items.
  - Disable submit buttons during form submission (pending state).

## Implementation Steps
1. **Setup**: Initialize Next.js 14+ (App Router), Tailwind CSS, Prisma.
2. **Database**: Define schema, run `prisma migrate dev`.
3. **Core Components**: Build Layout, Navbar, Button, Input.
4. **Feature - Post Trade**: Implement `src/app/listings/new` with Server Action validation.
5. **Feature - Feed**: Implement Home page with Prisma query (filtering/searching).
6. **Feature - Details & Propose**: Build dynamic route `[id]` with fetch logic and Proposal form.
7. **Refinement**: Add Loading/Error states, empty states, and placeholder images.

## Acceptance Criteria
- `npm run dev` starts without errors.
- User can create a listing; it appears immediately on the feed.
- Searching for a unique word finds the correct listing.
- Visiting a non-existent ID shows a graceful 404 message.
- Proposal form validates empty inputs and saves to DB on success.
- UI is responsive (mobile-friendly).
