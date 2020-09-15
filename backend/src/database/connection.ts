import Knex from "knex";
import path from "path";
require("dotenv").config();

const db = Knex({
  client: "pg",
  version: "7.2",
  connection: {
    host: "ec2-54-157-234-29.compute-1.amazonaws.com",
    user: "gqadmcokjhvjsl",
    password: "dd2ef01fa9bb49283a41e33e2a7e969df1aabc936f29560f944d8fe69060618f",
    database: "d5dcfa6l46vilu",
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default db;
