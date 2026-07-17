/* Do not change this file! You're more than welcome to read it though :) */

import { afterAll, beforeAll, describe, expect, it, test } from "vitest";

import db from "#db/client";
import { deleteMovie, getMovie, updateMovie } from "#db/queries/movies";

/** Connect to the database and start a transaction before all tests */
beforeAll(async () => {
  await db.connect();
  await db.query("BEGIN");
});

/** Rollback all changes made by the test cases and close the database connection */
afterAll(async () => {
  await db.query("ROLLBACK");
  await db.end();
});

describe('"movies" queries', () => {
  test("getMovie() returns the specified movie", async () => {
    const {
      rows: [expected],
    } = await db.query("SELECT * FROM movies WHERE id = 1");
    const result = await getMovie(1);
    expect(result).toEqual(expected);
  });

  test("deleteMovie() deletes the specified movie", async () => {
    await deleteMovie(1);
    const { rows } = await db.query("SELECT id FROM movies WHERE id = 1");
    expect(rows.length).toBe(0);
  });

  describe("updateMovie()", () => {
    const movieToUpdate = {
      id: 2,
      name: "Updated movie",
      releaseDate: "3000-01-01",
      runningTime: 300,
    };

    let updatedMovie;

    beforeAll(async () => {
      updatedMovie = await updateMovie(movieToUpdate);
    });

    it("updates the movie", async () => {
      const {
        rows: [{ name }],
      } = await db.query("SELECT name FROM movies WHERE id = $1", [
        movieToUpdate.id,
      ]);
      expect(name).toEqual(movieToUpdate.name);
    });

    it("returns the updated movie", async () => {
      expect(updatedMovie).toEqual(
        expect.objectContaining({
          id: movieToUpdate.id,
          name: movieToUpdate.name,
          release_date: expect.any(Date),
          running_time: movieToUpdate.runningTime,
        }),
      );
    });
  });
});
