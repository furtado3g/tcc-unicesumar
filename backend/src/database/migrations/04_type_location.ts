import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable("type_location", (table) => {
      table.increments("id").primary();
      table.string('description').notNullable()
    });
  }
  
  export async function down(knex: Knex) {
    return knex.schema.dropTable("type_location");
  }