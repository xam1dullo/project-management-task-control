import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { KNEX } from './constants/postgres';
import { Knex } from 'knex';

@Injectable()
export class PostgresService implements OnModuleInit {
  constructor(
    @Inject(KNEX) private readonly knex: Knex,
  ) { }

  async onModuleInit(): Promise<void> {
    try {
      await this.knex.raw('SELECT 1;');

      console.debug(
        'Postgres connected successfully',
        this.constructor.name,
      );
    } catch (error) {
      console.error(
        `Postgres connection refused [${error.message}]`,
        this.constructor.name,
        error.stack,
      );
    }
  }
}
