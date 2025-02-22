import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('organizations', (table) => {
    table
      .increments('id')
      .primary();
    table
      .string('name', 255)
      .notNullable()
      .unique();
    table
      .uuid('created_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table
      .timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex
    .schema
    .dropTableIfExists('organizations');
}
