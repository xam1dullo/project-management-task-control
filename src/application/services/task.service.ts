import { AssignUserToTaskDto } from "@application/dto/assign-user-to-task.dto";
import { CreateTaskDto } from '@application/dto/create-task.dto';
import { UpdateTaskDto } from '@application/dto/update-task.dto';
import { Task } from '@common/entities/task.entity';
import { TaskStatus } from '@domain/enums';
import { ITaskRepository } from '@interfaces/repositories/ITaskRepository';
import { IUserRepository } from "@interfaces/repositories/IUserRepository";
import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,

    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<any> {

    return this.taskRepository.create(createTaskDto);
  }

  async assignUserToTask(assignUserToTaskDto: AssignUserToTaskDto): Promise<any> {
    const task = await this.taskRepository.findById(assignUserToTaskDto.taskId);

    if (!task) {
      throw new NotFoundException(`Task with ID ${assignUserToTaskDto.taskId} not found`);
    }

    const user = await this.userRepository.findById(assignUserToTaskDto.userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${assignUserToTaskDto.userId} not found`);
    }

    return this.taskRepository.assignUserToTask(assignUserToTaskDto);
  }


  async createInProject(createTaskDto: CreateTaskDto, projectId: number): Promise<Task> {
    return this.create({ ...createTaskDto, projectId });
  }
  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }



  async findAllTasksGroupedByProjects(): Promise<any[]> {
    return await this.taskRepository.findAllTasksGroupedByProjects();


  }

  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async findTasksByUser(id: number): Promise<Task[] | any[]> {
    const tasks = await this.taskRepository.getTasksByUser(id);
    if (!tasks) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return tasks;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<void> {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    let doneAt: Date | undefined;

    if (updateTaskDto.status === TaskStatus.DONE) {
      doneAt = new Date();
    }
    const updateData: Partial<Task> = {
      ...updateTaskDto,
      done_at: doneAt,
    };

    await this.taskRepository.update(id, updateData);
  }

  async delete(id: number): Promise<void> {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    await this.taskRepository.delete(id);
  }

  async findByProjectId(projectId: number): Promise<Task[]> {
    return this.taskRepository.findByProjectId(projectId);
  }

  async findByWorkerUserId(workerUserId: number): Promise<Task[]> {
    return this.taskRepository.findByWorkerUserId(workerUserId);
  }
}
