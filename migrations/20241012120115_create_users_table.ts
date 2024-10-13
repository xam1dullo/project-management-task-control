import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table
      .increments('id')
      .primary();
    table
      .string('name', 255)
      .notNullable();
    table
      .enu('role', ['Admin', 'Manager', 'Employee'], {
        useNative: true,
        enumName: 'USER_ROLES'
      })
      .notNullable();
    table
      .uuid('created_by')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.timestamps(true, true);
    table.index(['role']);

  });
  await knex.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
  await knex.raw(`DROP TYPE IF EXISTS "USER_ROLES";`);
}
