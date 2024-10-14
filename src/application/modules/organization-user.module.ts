import { OrganizationUserService } from "@application/services/organization-user.service";
import { OrganizationUserRepository } from "@infrastructure/databases/repositories/organization-user.repository";
import { OrganizationController } from '@interfaces/controllers/organization.controller';
import { Module } from '@nestjs/common';
import { OrganizationModule } from "./organization.module";
import { UserModule } from "./user.module";
import { UserRepository } from "@infrastructure/databases/repositories/user.repository";

@Module({
  imports: [OrganizationModule, UserModule],
  providers: [
    OrganizationUserService,
    OrganizationUserRepository,
    UserRepository,
    {
      provide: 'IOrganizationUserRepository',
      useClass: OrganizationUserRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [OrganizationUserService],
})
export class OrganizationUserModule { }
