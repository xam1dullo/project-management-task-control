import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InfraModule } from './infrastructure/infra.module';
import { UserController } from './interfaces/controllers/user.controller';
import { TaskController } from './interfaces/controllers/task.controller';
import { ProjectController } from './interfaces/controllers/project.controller';
import { OrganizationController } from './interfaces/controllers/organization.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), InfraModule],
  controllers: [AppController, UserController, TaskController, ProjectController, OrganizationController],
  providers: [AppService],
})
export class AppModule {}
