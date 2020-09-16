import Knex from "knex";

/*
  The code snippet below will generate a table in the database where the sql code to be executed will be
  The table is responsible for managing the application's permission layers
  ```SQL
    CREATE TABLE type_user_permisions (
        id integer NOT NULL DEFAULT nextval('type_user_permisions_id_seq'::regclass),
        tp_user integer,
        id_permission integer,
        CONSTRAINT type_user_permisions_pkey PRIMARY KEY (id),
        CONSTRAINT type_user_permisions_id_permission_foreign FOREIGN KEY (id_permission)
            REFERENCES public.permissions (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        CONSTRAINT type_user_permisions_tp_user_foreign FOREIGN KEY (tp_user)
            REFERENCES public.user_type (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE
    )
  ```
*/

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
