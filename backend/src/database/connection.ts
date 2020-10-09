import Knex from "knex";
import * as dbInfo from '../configs/db.json'

const db = Knex({
  client: "pg",
  version: "7.2",
  connection: {
    host: dbInfo.host,
    user: dbInfo.user,
    password: dbInfo.password,
    database: dbInfo.database,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default db;
