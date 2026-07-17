/* Do not change this file! You're more than welcome to read it though :) */

import { afterAll, beforeAll, describe, expect, it, test } from "vitest";

import db from "#db/client";
import { createMovie, getMovies } from "#db/queries/movies";

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

describe('"movies" table', () => {
  it("is created", async () => {
    const sql = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_name = 'movies'
    `;
    const { rows } = await db.query(sql);
    expect(rows.length).toBe(1);
  });

  describe("columns", () => {
    let columns;

    beforeAll(async () => {
      const sql = `
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'movies'
      `;
      const { rows } = await db.query(sql);
      columns = rows;
    });

    test('"id" exists, is type serial, and is not nullable', () => {
      const id = columns.find((column) => column.column_name === "id");
      expect(id).toBeDefined();
      expect(id.data_type).toBe("integer");
      expect(id.column_default.startsWith("nextval")).toBe(true);
      expect(id.is_nullable).toBe("NO");
    });

    test('"name" exists, is type text, and is not nullable', () => {
      const name = columns.find((column) => column.column_name === "name");
      expect(name).toBeDefined();
      expect(name.data_type).toBe("text");
      expect(name.is_nullable).toBe("NO");
    });

    test('"release_date" exists, is type date, and is not nullable', () => {
      const release = columns.find(
        (column) => column.column_name === "release_date",
      );
      expect(release).toBeDefined();
      expect(release.data_type).toBe("date");
      expect(release.is_nullable).toBe("NO");
    });

    test('"running_time" exists, is type integer, and is not nullable', () => {
      const running = columns.find(
        (column) => column.column_name === "running_time",
      );
      expect(running).toBeDefined();
      expect(running.data_type).toBe("integer");
      expect(running.is_nullable).toBe("NO");
    });
  });

  it("is seeded with at least 5 movies", async () => {
    const sql = "SELECT * FROM movies";
    const { rows: movies } = await db.query(sql);
    expect(movies.length).toBeGreaterThanOrEqual(5);
  });
});

describe('"movies" queries', () => {
  test("getMovies() returns all movies", async () => {
    const { rows: expected } = await db.query("SELECT * FROM movies");
    const result = await getMovies();
    expect(result).toEqual(expected);
  });

  describe("createMovie()", () => {
    const movieToCreate = {
      name: "New movie",
      releaseDate: "3000-01-01",
      runningTime: 300,
    };

    let createdMovie;

    beforeAll(async () => {
      createdMovie = await createMovie(movieToCreate);
    });

    it("creates a new movie", async () => {
      const {
        rows: [{ name }],
      } = await db.query("SELECT name FROM movies WHERE name = 'New movie'");
      expect(name).toEqual(movieToCreate.name);
    });

    it("returns the created movie", async () => {
      expect(createdMovie).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: movieToCreate.name,
          release_date: expect.any(Date),
          running_time: movieToCreate.runningTime,
        }),
      );
    });
  });
});
