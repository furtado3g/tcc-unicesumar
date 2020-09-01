import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("locations", (table) => {
    table.increments("id").primary();
    table.string("tp_location").notNullable();
    table.text("comments").nullable();
    table.integer("capacity").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("locations");
}
