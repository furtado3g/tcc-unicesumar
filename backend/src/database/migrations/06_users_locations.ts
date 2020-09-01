import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("user_location", (table) => {
    table.increments("id").primary();
    table
      .integer("location_id")
      .references("id")
      .inTable("locations")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("user_location");
}
