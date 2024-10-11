import { Inject, Injectable } from '@nestjs/common';
import { KNEX } from "./infrastructure/databases/postgres/constants/postgres";
import { Knex } from "knex";

@Injectable()
export class AppService {
  constructor(@Inject(KNEX) private readonly knex: Knex) { }

  async getHello() {
    const [user] = await this.knex('users')
      .returning('*');

    return user;
  }
}
