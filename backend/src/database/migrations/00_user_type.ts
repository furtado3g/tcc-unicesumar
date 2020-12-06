import Knex from "knex";

/*
  The code snippet below will generate a table in the database where the sql code to be executed will be
  This table keeps storing information regarding the type of user that consists of defining the permission
  that each user will have in the system
  ````SQL
    CREATE TABLE user_type(
      id integer NOT NULL DEFAULT nextval('user_type_id_seq'::regclass),
      description character varying(255) COLLATE pg_catalog."default",
      CONSTRAINT user_type_pkey PRIMARY KEY (id)
    )
  ````
*/

export async function up(knex: Knex) {
  return knex.schema.createTable("user_type", (table) => {
    table.increments("id").primary();
    table.string('description');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("user_type");
}
