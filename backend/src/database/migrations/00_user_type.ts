import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("user_type", (table) => {
    table.increments("id").primary();
    table.string('description');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("user_type");
}
