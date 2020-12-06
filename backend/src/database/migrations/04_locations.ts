import Knex from "knex";

/*
  The code snippet below will generate a table in the database where the sql code to be executed will be
  The location table stores the data for the space that will be reserved
  ````SQL
    CREATE TABLE locations(
      id integer NOT NULL DEFAULT nextval('locations_id_seq'::regclass),
      tp_location character varying(255) COLLATE pg_catalog."default" NOT NULL,
      comments text COLLATE pg_catalog."default",
      capacity integer NOT NULL,
      CONSTRAINT locations_pkey PRIMARY KEY (id)
    )
  ````
*/

export async function up(knex: Knex) {
  return knex.schema.createTable("locations", (table) => {
    table.increments("id").primary();
    table.string("tp_location").notNullable();
    table.text("comments").nullable();
    table.integer("capacity").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("locations");
}
