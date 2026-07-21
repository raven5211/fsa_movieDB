import express from "express";
const router = express.Router();
export default router;

import {
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "#db/queries/movies";

router.get("/", async (req, res) => {
  const movies = await getMovies();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await getMovie(+id);
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, release_date, running_time } = req.body;

  const newMovie = {
    id: +id,
    name: name,
    release_date: release_date,
    running_time: running_time,
  };

  const movie = await updateMovie(newMovie);
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deleteMovie(+id);
  res.status(204).send();
});
