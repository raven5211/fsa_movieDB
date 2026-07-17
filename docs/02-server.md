# Serve data from the database

Now that our database is initialized and seeded, we can connect it with our Express app!

## Write more queries

A CRUD API needs to do more than just get and create movies - it also has to update and
delete them!

Complete the following functions in `db/queries/movie.js`.

1. `getMovie()`
2. `updateMovie()`
3. `deleteMovie()`

## Use the queries in an Express router

4. How does `server.js` interact with the database client?
5. An Express router has already been defined for you in `api/movies.js`.
   In `app.js`, use that router as the middleware for the `/movies` route.
6. In `api/movies.js`, how does the `GET /movies` endpoint get the movies to send?

In `api/movies.js`, define the middleware for the following endpoints.

7. `POST /movies`
   - Sends 400 with an error message if request body is not provided
   - Sends 400 with an error message if request body is missing a required field
   - Creates a movie according to the request body and sends it with status 201
8. `GET /movies/:id`
   - Sends 404 if the movie with the specified ID does not exist
   - Sends the movie with the specified ID if it does exist
9. `DELETE /movies/:id`
   - Sends 404 if the movie with the specified ID does not exist
   - Deletes the movie with the specified ID and sends 204
10. `PUT /movies/:id`
    - Sends 400 with an error message if request body is not provided
    - Sends 400 with an error message if request body is missing a required field
    - Sends 404 if the movie with the specified ID does not exist
    - Updates the movie with the specified ID according to the request body and sends it

You can check your work with `npm run test:server`. If you pass all test cases, then
congrats! You've now built a fully functional CRUD API that serves data from a database!
