import express from "express";
const app = express();
export default app;

app.use(express.json());

// TODO: route /movies to movies router

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
