This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started (Fresh Clone)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. Create database and run migrations
npx prisma migrate dev

# 4. Seed the database with sample data
npm run db:seed

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Database Commands

```bash
# Reset database (drops, migrates, and seeds)
npm run db:reset

# Seed database
npm run db:seed

# View database in browser
npx prisma studio
```

## Likes System

Likes are stored in the database (SQLite via Prisma) instead of localStorage for durability.

**How it works:**
- Each browser/device gets a unique `clientId` stored in localStorage
- When you like a listing, it's saved to the `Like` table in the database
- Likes persist across page refreshes and are not affected by reseeding
- If a liked listing is deleted (e.g., after reseed), it gracefully disappears from your liked list

**Database models:**
- `ClientSession`: Represents a browser/device session (id, createdAt)
- `Like`: Stores likes with clientId and listingId (unique constraint prevents duplicates)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
