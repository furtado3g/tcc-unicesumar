import Knex from "knex";

/*
  The code snippet below will generate a table in the database where the sql code to be executed will be
  This table persists in managing the session of each user logged in the system 
  ````SQL
    CREATE TABLE access(
      id integer NOT NULL DEFAULT nextval('access_id_seq'::regclass),
      access_at timestamp with time zone DEFAULT '2020-08-27 20:26:16.370331-03'::timestamp with time zone,
      expires_at timestamp with time zone DEFAULT (now() + '01:00:00'::interval),
      session_token character varying(255) COLLATE pg_catalog."default" NOT NULL,
      auth_token character varying(255) COLLATE pg_catalog."default" NOT NULL,
      user_id integer,
      CONSTRAINT access_pkey PRIMARY KEY (id),
      CONSTRAINT access_user_id_foreign FOREIGN KEY (user_id)
          REFERENCES users (id) MATCH SIMPLE
          ON UPDATE CASCADE
          ON DELETE CASCADE
    )
  ````
*/

export async function up(knex: Knex) {
  return knex.schema.createTable("sessions", (table) => {
    table.increments("id").primary();
    table.dateTime("access_at").defaultTo('now()')
    table.dateTime("expires_at").defaultTo(knex.raw("now() + '1 hour'::interval"))
    table.string("session_token").notNullable()
    table.string("auth_token").notNullable()
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("sessions");
}
