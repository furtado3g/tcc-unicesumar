import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("users_permissions", (table) => {
    table.increments("id").primary();
    table
        .string('tp_user')
        .references('user_type')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table
        .integer('id_permission')
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("users_permissions");
}
