import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from './infrastructure/infra.module';
import { ConfigifyModule } from '@itgorillaz/configify';

import {
  OrganizationModule,
  ProjectModule,
  TaskModule,
  UserModule,
  AuthModule,
} from '@application/modules';
import { AdminController } from './interfaces/controllers/admin.controller';
import { ManagerController } from './interfaces/controllers/manager.controller';
import { EmployeeController } from './interfaces/controllers/employee.controller';
import { AdminModule } from "@application/modules/admin.module";

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    ConfigifyModule.forRootAsync(),
    ProjectModule,
    InfraModule,
    UserModule,
    TaskModule,
    OrganizationModule,
    AuthModule,
    AdminModule
  ],
  controllers: [AppController, ManagerController, EmployeeController],
  providers: [AppService],
})
export class AppModule { }
