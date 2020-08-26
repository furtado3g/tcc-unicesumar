import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable();
    table.string("last_password").nullable();
    table.dateTime("created_at").defaultTo(knex.fn.now())
    table
      .integer("user_type")
      .references('id')
      .inTable('user_type')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}