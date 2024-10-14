import { SignUpDto } from "@application/dto";
import { CreateUserDto } from "@application/dto/create-user.dto";
import { User } from '@common/entities/user.entity';
import { Knex } from "knex";

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  create(user: User | CreateUserDto): Promise<User>;
  createWithTransaction(trx: Knex.Transaction, signUpDto: SignUpDto): Promise<any>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByLogin(login: string): Promise<User | null>;
  update(id: number, user: Partial<User>): Promise<void>;
  delete(id: number): Promise<void>;
}
