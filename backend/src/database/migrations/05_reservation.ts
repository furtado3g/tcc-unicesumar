import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("id").primary();
    table.date("date").defaultTo("now").notNullable();
    table.time("time").notNullable();
    table.string("class").nullable();
    table.string("discipline").nullable();
    table.text("comments").nullable();
    table
      .integer("location_id")
      .references("id")
      .inTable("locations")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("teacher_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("reservations");
}
