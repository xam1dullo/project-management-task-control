import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TYPE task_status AS ENUM ('CREATED', 'IN_PROCESS', 'DONE');
  `);

  await knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table
      .integer('created_by')
      .nullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table
      .timestamp('created_at')
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .integer('project_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE');
    table.date('due_date').notNullable();
    table
      .integer('worker_user_id')
      .nullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table
      .enum('status', ['CREATED', 'IN_PROCESS', 'DONE'])
      .notNullable()
      .defaultTo('CREATED');

    table.timestamp('done_at').nullable();
    table.timestamps(true, true);

    table.index(['project_id', 'status']);
    table.index(['worker_user_id', 'status']);

  });

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('tasks');
}
