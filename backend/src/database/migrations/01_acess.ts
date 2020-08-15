import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("access", (table) => {
    table.increments("id").primary();
    table.dateTime("access_at").defaultTo(knex.fn.now())
    table.dateTime("expires_at").defaultTo(knex.fn.now())
    table.string("session_token").notNullable()
    table.string("auth_token").notNullable()
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("access");
}
