import Knex from "knex";

/*
  The code snippet below will generate a table in the database where the sql code to be executed will be
  The permission table holds information relevant to each user's access
  ````SQL
    CREATE TABLE permissions(
      id integer NOT NULL DEFAULT nextval('permissions_id_seq'::regclass),
      endpoint character varying(255) COLLATE pg_catalog."default" NOT NULL,
      CONSTRAINT permissions_pkey PRIMARY KEY (id)
    )
  ````
*/

export async function up(knex: Knex) {
  return knex.schema.createTable("permissions", (table) => {
    table.increments("id").primary();
    table.string('endpoint').notNullable()
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("permissions");
}
