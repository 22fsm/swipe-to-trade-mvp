import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const listings = [
  {
    title: "PlayStation 5 Console",
    description:
      "PS5 Disc Edition in excellent condition. Includes original controller and cables. Barely used, mostly for streaming.",
    haveCategory: "Electronics",
    haveCondition: "Like New",
    haveEstimatedValue: 400,
    wantText: "Looking for a high-end gaming laptop or MacBook Pro",
    wantTags: "laptop,macbook,gaming laptop",
    location: "Brooklyn, NY",
  },
  {
    title: "iPhone 14 Pro Max 256GB",
    description:
      "Space Black, unlocked. Minor scratch on back glass, screen is perfect. Battery health 92%. Comes with case and charger.",
    haveCategory: "Electronics",
    haveCondition: "Good",
    haveEstimatedValue: 650,
    wantText: "Want a DSLR camera or mirrorless camera setup",
    wantTags: "camera,dslr,sony,canon,photography",
    location: "Manhattan, NY",
  },
  {
    title: "MacBook Air M2 2022",
    description:
      "Midnight color, 8GB RAM, 256GB SSD. Perfect condition with AppleCare+ until 2025. Includes original box and charger.",
    haveCategory: "Electronics",
    haveCondition: "Like New",
    haveEstimatedValue: 900,
    wantText: "Looking for a road bike or high-end electric scooter",
    wantTags: "bike,road bike,electric scooter,transportation",
    location: "Austin, TX",
  },
  {
    title: "Mid-Century Modern Leather Couch",
    description:
      "Genuine brown leather 3-seater sofa. Some wear on armrests but very comfortable. Moving and can't take it with me.",
    haveCategory: "Furniture",
    haveCondition: "Good",
    haveEstimatedValue: 500,
    wantText: "Need a standing desk setup or ergonomic office chair",
    wantTags: "desk,standing desk,office chair,herman miller",
    location: "San Francisco, CA",
  },
  {
    title: "Canon EOS R6 Camera Body",
    description:
      "Professional mirrorless camera with low shutter count (~5000). Includes 2 batteries and SD card. No lens included.",
    haveCategory: "Electronics",
    haveCondition: "Excellent",
    haveEstimatedValue: 1200,
    wantText: "Want a PS5 + Nintendo Switch combo or gaming PC",
    wantTags: "ps5,nintendo switch,gaming pc,console",
    location: "Seattle, WA",
  },
  {
    title: "Electric Guitar - Fender Stratocaster",
    description:
      "2019 Fender Player Stratocaster in Sunburst. Plays great, recently set up. Includes gig bag and strap.",
    haveCategory: "Music",
    haveCondition: "Excellent",
    haveEstimatedValue: 600,
    wantText: "Looking for DJ equipment or electronic music gear",
    wantTags: "dj,turntable,synthesizer,midi controller",
    location: "Los Angeles, CA",
  },
  {
    title: "Herman Miller Aeron Chair",
    description:
      "Size B, fully loaded with all adjustments. Has some wear on mesh but fully functional. Best office chair ever made.",
    haveCategory: "Furniture",
    haveCondition: "Good",
    haveEstimatedValue: 700,
    wantText: "Want a nice espresso machine or coffee setup",
    wantTags: "espresso,coffee machine,breville,gaggia",
    location: "Chicago, IL",
  },
  {
    title: "Nintendo Switch OLED + 10 Games",
    description:
      "White OLED model with Zelda TOTK, Mario Kart, Smash Bros, and 7 more games. Pro controller included.",
    haveCategory: "Electronics",
    haveCondition: "Like New",
    haveEstimatedValue: 450,
    wantText: "Looking for a tablet - iPad Pro or Samsung Galaxy Tab",
    wantTags: "ipad,tablet,samsung tab,drawing tablet",
    location: "Denver, CO",
  },
  {
    title: "Specialized Road Bike",
    description:
      "2021 Specialized Allez in size 56. Carbon fork, Shimano 105 groupset. Well maintained, new tires and chain.",
    haveCategory: "Sports",
    haveCondition: "Excellent",
    haveEstimatedValue: 800,
    wantText: "Want home gym equipment - weights, bench, rack",
    wantTags: "weights,dumbbells,bench press,squat rack,gym",
    location: "Portland, OR",
  },
  {
    title: "DJI Mavic 3 Drone",
    description:
      "Fly More combo with 3 batteries, ND filters, and carrying case. Under 10 hours flight time. Perfect for content creators.",
    haveCategory: "Electronics",
    haveCondition: "Like New",
    haveEstimatedValue: 1500,
    wantText: "Looking for a high-end laptop or desktop PC for video editing",
    wantTags: "laptop,macbook pro,pc,video editing,workstation",
    location: "Miami, FL",
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing listings
  await prisma.listing.deleteMany();

  // Insert seed data
  for (const listing of listings) {
    await prisma.listing.create({
      data: listing,
    });
  }

  console.log(`Seeded ${listings.length} listings.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
