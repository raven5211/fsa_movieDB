import router from "#api/movies";
import express from "express";
const app = express();
export default app;

app.use(express.json());

app.use("/api/movies", router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
