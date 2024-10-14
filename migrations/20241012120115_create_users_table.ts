import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table
      .increments('id')
      .primary();
    table
      .string('name')
      .notNullable();

    table
      .enum('role', ['ADMIN', 'MANAGER', 'EMPLOYEE'])
      .defaultTo('ADMIN')
      .notNullable();
    table
      .integer('created_by')
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');

    table.timestamps(true, true);



    table.index(['login']);
    table.index(['role']);

  });

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
