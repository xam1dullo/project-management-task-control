import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { compare, hash } from 'bcrypt';
import { SignInDto, SignUpDto } from '@application/dto';
import { KNEX } from '@infrastructure/databases/postgres/constants/postgres';
import { IUserRepository } from '@interfaces/repositories/IUserRepository';
import { User } from '@common/entities/user.entity';
import { CreateUserDto } from '@application/dto/create-user.dto';
import { UpdateUserDto } from '@application/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(KNEX) private readonly knex: Knex,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const user = new User(
      createUserDto.name,
      createUserDto.createdBy,
      createUserDto.role,
    );

    return this.userRepository.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }


    const updateData: Partial<User> = updateUserDto;

    await this.userRepository.update(id, updateData);
  }

  async delete(id: number): Promise<void> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.delete(id);
  }
}
