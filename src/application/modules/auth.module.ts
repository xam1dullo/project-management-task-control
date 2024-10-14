import { AuthService } from '@application/services/auth.service';
import { AuthController } from '@interfaces/controllers/auth.controller';
import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { UserRepository } from "@infrastructure/databases/repositories/user.repository";

@Module({
  imports: [UserModule],
  providers: [
    AuthService
    , {
      provide: 'IUserRepository',
      useClass: UserRepository,
    }],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule { }
