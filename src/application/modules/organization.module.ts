import { OrganizationService } from '@application/services/organization.service';
import { OrganizationRepository } from '@infrastructure/databases/repositories/organization.repository';
import { OrganizationController } from '@interfaces/controllers/organization.controller';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    OrganizationService,
    OrganizationRepository,
    {
      provide: 'IOrganizationRepository',
      useClass: OrganizationRepository,
    },
  ],
  controllers: [OrganizationController],
  exports: [OrganizationService, "IOrganizationRepository"],
})
export class OrganizationModule { }
