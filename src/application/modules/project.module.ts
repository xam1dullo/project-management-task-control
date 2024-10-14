import { ProjectService } from '@application/services/project.service';
import { ProjectRepository } from '@infrastructure/databases/repositories/project.repository';
import { UserRepository } from "@infrastructure/databases/repositories/user.repository";
import { ProjectController } from '@interfaces/controllers/project.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    {
      provide: 'IProjectRepository',
      useClass: ProjectRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [ProjectService],
})
export class ProjectModule { }
