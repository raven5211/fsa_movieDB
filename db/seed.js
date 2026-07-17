import db from "#db/client";

await db.connect();
await seedMovies();
await db.end();
console.log("🌱 Database seeded.");

async function seedMovies() {
  // TODO
}
