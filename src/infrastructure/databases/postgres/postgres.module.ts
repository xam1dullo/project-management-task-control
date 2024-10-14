import { Global, Module, Provider } from '@nestjs/common';
import knex, { Knex } from 'knex';
import { KNEX } from './constants/postgres';
import * as knexConfig from 'knexfile';
import { PostgresService } from './postgres.service';
import { ApplicationConfig } from '@config/index';

const knexProvider: Provider = {
  provide: KNEX,
  useFactory(configService: ApplicationConfig): Knex {
    return knex(knexConfig[configService.nodeEnv]);
  },
  inject: [ApplicationConfig],
};

@Global()
@Module({
  providers: [knexProvider, PostgresService],
  exports: [knexProvider],
})
export class PostgresModule {}
