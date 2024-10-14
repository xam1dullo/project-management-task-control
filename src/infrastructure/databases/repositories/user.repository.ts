import { Inject, Injectable } from '@nestjs/common';
import { KNEX } from '../postgres/constants/postgres';
import { Knex } from 'knex';
import { IUserRepository } from '@interfaces/repositories/IUserRepository';
import { User } from '@common/entities/user.entity';
import { SignUpDto } from "@application/dto";
import { CreateUserDto } from "@application/dto/create-user.dto";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject(KNEX) private readonly db: Knex) { }

  async create(user: CreateUserDto): Promise<User> {

    const { createdBy, ...newUser } = user


    const [createdUser] = await this.db('users').insert({ ...newUser, created_by: createdBy }).returning('*');
    return createdUser;
  }

  async createWithTransaction(trx: Knex.Transaction, signUpDto: SignUpDto): Promise<any> {
    const { name, login, password, role, createdBy } = signUpDto;
    return trx('users')
      .insert({
        name,
        login,
        password,
        role,
        created_by: createdBy,
      })
      .returning('*');
  }
  async findById(id: number): Promise<User | null> {
    const user = await this.db('users').where({ id }).first();
    return user || null;
  }

  async findAll(): Promise<User[] | []> {
    const user = await this.db('users').select("*")
    return user || null;
  }

  async findByLogin(login: string): Promise<User | null> {
    const user = await this.db('users').where({ login }).first();
    return user || null;
  }

  async findByOrganization(orgId: number): Promise<User[]> {
    const users = await this.db('users')
      .join('organization_users', 'users.id', 'organization_users.user_id')
      .where('organization_users.org_id', orgId)
      .select('users.*');
    return users;
  }


  async getUsersByOrganization(orgId: string): Promise<any[]> {
    return this.db('users')
      .join('organization_user', 'users.id', 'organization_user.user_id')
      .where('organization_user.org_id', orgId)
      .select('users.*'); // Return user details
  }

  async update(id: number, user: Partial<User>): Promise<void> {
    await this.db('users').where({ id }).update(user);
  }

  async delete(id: number): Promise<void> {
    await this.db('users').where({ id }).del();
  }
}
