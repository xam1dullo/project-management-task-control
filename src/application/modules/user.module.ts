import { UserService } from '@application/services/user.service';
import { UserRepository } from "@infrastructure/databases/repositories/user.repository";
import { Module } from '@nestjs/common';

@Module({
  providers: [

    UserService, {
      provide: 'IUserRepository',
      useClass: UserRepository,
    }
  ],
  exports: [UserService],
})
export class UserModule { }
