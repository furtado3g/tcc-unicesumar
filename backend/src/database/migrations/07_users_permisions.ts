import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("type_user_permisions", (table) => {
    table.increments("id").primary();
    table
      .integer('tp_user')
      .references('id')
      .inTable('user_type')
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
  return knex.schema.dropTable("type_user_permisions");
}
