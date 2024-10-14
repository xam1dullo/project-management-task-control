import { AdminService } from "@application/services/admin.service";
import { AdminController } from "@interfaces/controllers/admin.controller";
import { forwardRef, Module } from '@nestjs/common';
import { OrganizationModule } from "./organization.module";
import { UserModule } from "./user.module";
import { OrganizationRepository } from "@infrastructure/databases/repositories/organization.repository";
import { OrganizationUserRepository } from "@infrastructure/databases/repositories/organization-user.repository";
import { OrganizationUserModule } from "./organization-user.module";

@Module({
  imports: [
    forwardRef(() => OrganizationModule),
    forwardRef(() => OrganizationUserModule),
    forwardRef(() => UserModule), // UserModule ni AdminModule ga qo'shing
  ],
  controllers: [AdminController],
  providers: [AdminService,
    {
      provide: 'IOrganizationRepository',
      useClass: OrganizationRepository,
    },
    {
      provide: 'IOrganizationUserRepository',
      useClass: OrganizationUserRepository,
    },
  ],
  exports: [AdminService],
})
export class AdminModule { }
