import Knex from "knex";
import path from "path";
require("dotenv").config();

const db = Knex({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "Therev a7x",
    database: "rlab",
  },
});

export default db;
