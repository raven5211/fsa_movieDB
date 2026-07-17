# Set up the database

## Define the initial database schema

1. Create a database named "moviedb".\
   `createdb moviedb`
2. The next step after creating a database is to define its **schema**, which is the
   blueprint that describes the structures of all tables within the database. To start
   off, our database will contain only one table.\
   In `db/schema.sql`, write SQL to create a table named `movies`. Refer to the
   PostgreSQL documentation on [types](https://www.postgresql.org/docs/current/datatype.html)
   and [constraints](https://www.postgresql.org/docs/current/ddl-constraints.html) to define
   the following columns:

   1. `id` is an auto-incrementing number. It is the **primary key** of the table.
   2. `name` is unique text that cannot be null.
   3. `release_date` is a date (without time) that cannot be null.
   4. `running_time` is an integer that cannot be null.

3. Read the `db:schema` script in `package.json`. What file does it ask `psql` to run?
4. How does `psql` know which database to run the file on?
5. Run the script to sync your database with the schema that you just wrote.\
   `npm run db:schema`.
6. Connect to the database with `psql -d moviedb` and run `\d movies` to verify that the
   movies table was created with the correct columns.

> [!NOTE]
>
> A SQL file that modifies a database's schema, such as creating tables, adding
> columns, or changing data types, is called a **migration**. As projects grow,
> changes to the database schema are tracked as a sequence of SQL files in a
> migrations folder.

## Seed the database

Now that the database has been created and synced with a schema, we can populate it with
some initial data! This process is called **seeding** the database.

7. So far, we've been using `psql` to interact with our databases. In order to bridge the
   gap between JavaScript and PostgreSQL, we're going to use the [node-postgres](https://node-postgres.com/) library!
   This will allow us to write scripts in JavaScript to query the database. This
   connection is defined in `db/client.js`.\
   How does `pg` (the node-postgres package) know which database to connect to?
8. `process.env` allows a program to access **environment variables**, which are
   conventionally defined in a `.env` file. Rename the provided `example.env` to `.env`
   and replace the placeholder credentials with your actual PostgreSQL credentials.

> [!WARNING]
>
> You must be using Node v21 or later in order to read the `.env` file!

9. The `pg` client can now be used to send SQL queries from a JavaScript program, and the
   records will be returned as an array of JavaScript objects. Open `db/queries/movies.js`.
   What SQL query does the function `getMovies()` send to the database?
10. What does `db.query` return?
11. What does `getMovies` return?
12. Complete `createMovie()`, which inserts a new record into the movie table according
    to the provided details. It should return the created movie.
    You will need to use a [parameterized query](https://node-postgres.com/features/queries#parameterized-query).
13. In `db/seed.js`, complete `seedMovies()` to create at least 5 movies using the
    `createMovie()` function that you just wrote. You can use fake or placeholder data!

> [!TIP]
>
> If you want to seed your database with more realistic data,
> consider using a library like [Faker](https://fakerjs.dev/)!

14. Run the seed script to seed your database, and use `psql` to confirm that the records
    have correctly been added to the movies table.\
    `npm run db:seed`

> [!TIP]
>
> A third script `db:reset` is also written for you, which is handy while you're
> testing and developing your database. It will wipe everything, apply your schema,
> then seed the database with your seed script. Feel free to run this script if
> anything goes wrong!

Check your work with `npm run test:database`! If you pass all test cases, you have
successfully written JavaScript to communicate with your database! In the next block, we
will learn how to serve this data with Express.
