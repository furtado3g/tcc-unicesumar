import path from "path";
import * as dbInfo from './db.json'
module.exports = {
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
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
};
