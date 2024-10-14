import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('projects', (table) => {
    table
      .increments('id')
      .primary();
    table
      .integer('org_id')
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE');
    table
      .integer('created_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table
      .string('name')
      .notNullable();

    table.timestamps(true, true);

    table.index(['org_id']);
    table.unique(['org_id', 'name']);

  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('projects');
}
