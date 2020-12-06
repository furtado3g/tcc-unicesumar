import Knex from "knex";

/**
  The code snippet below will generate a table in the database where the sql code to be executed will be
  The table below stores the reservation data that will be made by the user
  ```` SQL
      CREATE TABLE reservations (
          id integer NOT NULL DEFAULT nextval('reservations_id_seq'::regclass),
          date date NOT NULL DEFAULT '2020-08-27'::date,
          time_start time without time zone NOT NULL,
          time_end time without time zone NOT NULL,
          class character varying(255) COLLATE pg_catalog."default",
          discipline character varying(255) COLLATE pg_catalog."default",
          comments text COLLATE pg_catalog."default",
          location_id integer,
          teacher_id integer,
          CONSTRAINT reservations_pkey PRIMARY KEY (id),
          CONSTRAINT reservations_location_id_foreign FOREIGN KEY (location_id)
              REFERENCES public.locations (id) MATCH SIMPLE
              ON UPDATE CASCADE
              ON DELETE CASCADE,
          CONSTRAINT reservations_teacher_id_foreign FOREIGN KEY (teacher_id)
              REFERENCES public.users (id) MATCH SIMPLE
              ON UPDATE CASCADE
              ON DELETE CASCADE
      )
 *  ````
 */


export async function up(knex: Knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("id").primary();
    table.date("date").defaultTo("now").notNullable();
    table.time("time_start").notNullable();
    table.time("time_end").notNullable();
    table.string("class").nullable();
    table.string("discipline").nullable();
    table.text("comments").nullable();
    table
      .integer("location_id")
      .references("id")
      .inTable("locations")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("teacher_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("reservations");
}
