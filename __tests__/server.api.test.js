/* Do not change this file! You're more than welcome to read it though :) */

import request from "supertest";
import { describe, expect, it, test, vi } from "vitest";

import app from "#app";
import db from "#db/client";

/** Mock the database client to test just the API */
vi.mock("#db/client", () => ({
  default: { query: vi.fn() },
}));

const mockMovie = {
  id: 1,
  name: "Mock Movie",
  releaseDate: "1000-01-01",
  runningTime: 100,
};

test("GET /movies sends all movies", async () => {
  db.query.mockResolvedValue({ rows: [mockMovie, mockMovie] });
  const response = await request(app).get("/movies");
  expect(response.status).toBe(200);
  expect(response.body).toEqual([mockMovie, mockMovie]);
});

describe("POST /movies", () => {
  it("sends 400 if request has no body", async () => {
    const response = await request(app).post("/movies");
    expect(response.status).toBe(400);
  });

  it("sends 400 if request body does not have required fields", async () => {
    const response = await request(app).post("/movies").send({});
    expect(response.status).toBe(400);
  });

  it("creates a movie and sends it with status 201", async () => {
    db.query.mockResolvedValue({ rows: [mockMovie] });
    const response = await request(app).post("/movies").send(mockMovie);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockMovie);
  });
});

describe("GET /movies/:id", () => {
  it("sends 404 if movie does not exist", async () => {
    db.query.mockResolvedValue({ rows: [] });
    const response = await request(app).get("/movies/1");
    expect(response.status).toBe(404);
  });

  it("sends the movie if it exists", async () => {
    db.query.mockResolvedValue({ rows: [mockMovie] });
    const response = await request(app).get("/movies/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMovie);
  });
});

describe("DELETE /movies/:id", () => {
  it("sends 404 if movie does not exist", async () => {
    db.query.mockResolvedValue({ rows: [] });
    const response = await request(app).delete("/movies/1");
    expect(response.status).toBe(404);
  });

  it("deletes the movie and sends 204", async () => {
    db.query.mockResolvedValue({ rows: [mockMovie] });
    const response = await request(app).delete("/movies/1");
    expect(response.status).toBe(204);
  });
});

describe("PUT /movies/:id", () => {
  it("sends 400 if request has no body", async () => {
    db.query.mockResolvedValue({ rows: [mockMovie] });
    const response = await request(app).put("/movies/1");
    expect(response.status).toBe(400);
  });

  it("sends 400 if request body does not have required fields", async () => {
    db.query.mockResolvedValue({ rows: [mockMovie] });
    const response = await request(app).put("/movies/1").send({});
    expect(response.status).toBe(400);
  });

  it("sends 404 if movie does not exist", async () => {
    db.query.mockResolvedValue({ rows: [] });
    const response = await request(app).put("/movies/1").send(mockMovie);
    expect(response.status).toBe(404);
  });

  it("updates and sends the movie", async () => {
    db.query.mockResolvedValue({ rows: [mockMovie] });
    const response = await request(app).put("/movies/1").send(mockMovie);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMovie);
  });
});
