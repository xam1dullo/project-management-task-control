import { TaskService } from '@application/services/task.service';
import { TaskRepository } from '@infrastructure/databases/repositories/task.repository';
import { UserRepository } from "@infrastructure/databases/repositories/user.repository";
import { TaskController } from '@interfaces/controllers/task.controller';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    TaskService,
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },

  ],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule { }
