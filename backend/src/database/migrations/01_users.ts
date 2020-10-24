import Knex from 'knex';

/*
  The code snippet below will generate a table in the database where the sql code to be executed will be
  The user table persists in keeping the personal data of each user of the system
  ````SQL
    CREATE TABLE public.users(
      id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
      name character varying(255) COLLATE pg_catalog."default" NOT NULL,
      username character varying(255) COLLATE pg_catalog."default" NOT NULL,
      password character varying(255) COLLATE pg_catalog."default" NOT NULL,
      email character varying(255) COLLATE pg_catalog."default" NOT NULL,
      last_password character varying(255) COLLATE pg_catalog."default",
      created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
      user_type integer,
      CONSTRAINT users_pkey PRIMARY KEY (id),
      CONSTRAINT users_user_type_foreign FOREIGN KEY (user_type)
          REFERENCES public.user_type (id) MATCH SIMPLE
          ON UPDATE CASCADE
          ON DELETE CASCADE
    )
  ````
*/

export async function up(knex: Knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable();
    table.string("last_password").nullable();
    table.dateTime("created_at").defaultTo(knex.fn.now())
    table.boolean("active").defaultTo(true)
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