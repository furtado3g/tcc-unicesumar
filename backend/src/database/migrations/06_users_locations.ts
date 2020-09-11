import Knex from "knex";

/**
 *  The code snippet below will generate a table in the database where the sql code to be executed will be
 *  The table below will manage the relationship between the user and the space under their responsibility
 *  ```` SQL
 *    CREATE TABLE public.user_location (
          id integer NOT NULL DEFAULT nextval('user_location_id_seq'::regclass),
          location_id integer,
          user_id integer,
          CONSTRAINT user_location_pkey PRIMARY KEY (id),
          CONSTRAINT user_location_location_id_foreign FOREIGN KEY (location_id)
              REFERENCES public.locations (id) MATCH SIMPLE
              ON UPDATE CASCADE
              ON DELETE CASCADE,
          CONSTRAINT user_location_user_id_foreign FOREIGN KEY (user_id)
              REFERENCES public.users (id) MATCH SIMPLE
              ON UPDATE CASCADE
              ON DELETE CASCADE
      )
 *  ````
 */

export async function up(knex: Knex) {
  return knex.schema.createTable("user_location", (table) => {
    table.increments("id").primary();
    table
      .integer("location_id")
      .references("id")
      .inTable("locations")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("user_location");
}
