import path from "path";

module.exports = {
  client: "sqlite",
  connection: {
    filename: path.resolve(__dirname,'src','database', "database.sqlite"),
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
};