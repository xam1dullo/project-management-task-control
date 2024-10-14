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
import { IUserRepository } from "@interfaces/repositories/IUserRepository";
import { User } from "@common/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject(KNEX) private readonly knex: Knex,
  ) { }

  async signUp(signUpDto: SignUpDto) {
    try {
      return await this.knex.transaction(async (trx) => {
        const userInfo = await trx('users')
          .where({ login: signUpDto.login })
          .first();

        if (userInfo) {
          throw new ConflictException('User already exists');
        }

        const hashedPassword = await hash(signUpDto.password, 10);

        const newUser = await this.userRepository.createWithTransaction(trx, {
          ...signUpDto,
          password: hashedPassword,
        });

        return { message: 'User successfully created', status: HttpStatus.OK };
      });
    } catch (error) {
      if (error.code === '23505') {
        // Postgres duplicate key error code
        throw new ConflictException('Username or email already exists');
      }
      throw error;
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const user = await this.knex('users')
        .where({ login: signInDto.login })
        .first();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await compare(signInDto.password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      this.userRepository.findByLogin(signInDto.login);


      return { message: 'User successfully authenticated' };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[] | []> {
    try {
      return this.userRepository.findAll();

    } catch (error) {
      throw error;
    }
  }
}
