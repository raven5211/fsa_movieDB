import db from "#db/client";

/** @returns all movies in the database */
export async function getMovies() {
  const sql = `
    SELECT *
    FROM movies
  `;
  const { rows: movies } = await db.query(sql);
  return movies;
}

/** @returns the movie created according to the provided details */
export async function createMovie({ name, releaseDate, runningTime }) {
  const sql = `
    INSERT INTO movies (name, release_date, running_time)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const { rows: movies } = await db.query(sql, [
    name,
    releaseDate,
    runningTime,
  ]);
  return movies[0];
}

// === Part 2 ===

/**
 * @returns the movie with the given id
 * @returns undefined if movie with the given id does not exist
 */
export async function getMovie(id) {
  const sql = `
    SELECT * FROM movies
    WHERE id = $1
  `;
  const { rows: movies } = await db.query(sql, [id]);
  return movies[0];
}

/**
 * @returns the updated movie with the given id
 * @returns undefined if movie with the given id does not exist
 */
export async function updateMovie({ id, name, release_date, running_time }) {
  const sql = `
    UPDATE movies
    SET name = $1, release_date = $2, running_time = $3
    WHERE id = $4
    RETURNING *
  `;
  const { rows: movies } = await db.query(sql, [
    name,
    release_date,
    running_time,
    id,
  ]);
  return movies[0];
}

/**
 * @returns the deleted movie with the given id
 * @returns undefined if movie with the given id does not exist
 */
export async function deleteMovie(id) {
  const sql = `
    DELETE FROM movies
    WHERE id = $1
    RETURNING *
  `;
  const { rows: movies } = await db.query(sql, [id]);
  return movies[0];
}
