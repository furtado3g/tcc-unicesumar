import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("userName").notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable();
    table.string("last_password").nullable();
    table.string("userType").defaultTo("PRO")
    table.dateTime("created_at").defaultTo(knex.fn.now())
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}