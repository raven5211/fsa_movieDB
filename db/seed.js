import db from "#db/client";
import { createMovie } from "./queries/movies.js";

await db.connect();
await seedMovies();
await db.end();
console.log("🌱 Database seeded.");

async function seedMovies() {
  const movies = [
    {
      name: "The Shawshank Redemption",
      releaseDate: "1994-09-13",
      runningTime: 144,
    },
    {
      name: "The Godfather",
      releaseDate: "1972-03-15",
      runningTime: 175,
    },
    {
      name: "The Dark Knight",
      releaseDate: "2008-07-14",
      runningTime: 152,
    },
    {
      name: "The Godfather Part II",
      releaseDate: "1974-12-18",
      runningTime: 202,
    },
    {
      name: "12 Angry Men",
      releaseDate: "1957-04-18",
      runningTime: 96,
    },
  ];

  for (const movie of movies) {
    await createMovie(movie);
  }
}
