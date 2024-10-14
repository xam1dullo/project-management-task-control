import { AssignUserToTaskDto } from "@application/dto/assign-user-to-task.dto";
import { Task } from '@common/entities/task.entity';

export const ITaskRepository = Symbol('ITaskRepository');

export interface ITaskRepository {
  create(task: any): Promise<Task>;
  findAll(): Promise<Task[]>;
  findAllTasksGroupedByProjects(): Promise<any[]>;
  findById(id: number): Promise<Task | null>;
  update(id: number, task: Partial<Task>): Promise<void>;
  delete(id: number): Promise<void>;
  assignUserToTask(assignUserToTaskDto: AssignUserToTaskDto): Promise<any[]>;
  findByWorkerUserId(workerUserId: number): Promise<Task[]>;
  findByProjectId(projectId: number): Promise<Task[]>;
  getTasksByUser(id: number): Promise<Task[]>;
}
