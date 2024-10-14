import { Task } from '@common/entities/task.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { KNEX } from '../postgres/constants/postgres';
import { Knex } from 'knex';
import { ITaskRepository } from '@interfaces/repositories/ITaskRepository';
import { TaskStatus } from '@domain/enums';
import { CreateTaskDto } from "@application/dto/create-task.dto";
import { AssignUserToTaskDto } from "@application/dto/assign-user-to-task.dto";

@Injectable()
export class TaskRepository implements ITaskRepository {
  private table = 'tasks';

  constructor(@Inject(KNEX) private readonly db: Knex) { }

  assignUserToTask(assignUserToTaskDto: AssignUserToTaskDto): Promise<any[]> {
    return this.db(this.table)
      .where({ id: assignUserToTaskDto.taskId })
      .update({ worker_user_id: assignUserToTaskDto.userId })
      .returning('*')
  }

  async findAllTasksGroupedByProjects(): Promise<any[]> {
    const tasks = await this.db(this.table)
      .join('projects', 'tasks.project_id', 'projects.id')
      .select(
        'projects.id as projectId',
        'projects.name as projectName',
        'tasks.id as taskId',
        'tasks.name as taskName',
        'tasks.due_date as taskDueDate',
        'tasks.worker_user_id as workerUserId',
      )
      .orderBy('projects.id', 'asc');

    const groupedTasks = tasks.reduce((acc, task) => {
      const { projectId, projectName, taskId, taskName, taskDescription, taskDueDate, assignedTo } = task;

      if (!acc[projectId]) {
        acc[projectId] = {
          projectId,
          projectName,
          tasks: [],
        };
      }

      acc[projectId].tasks.push({
        taskId,
        taskName,
        taskDescription,
        taskDueDate,
        assignedTo,
      });

      return acc;
    }, {});

    return Object.values(groupedTasks);
  }

  async create(task: CreateTaskDto): Promise<Task> {
    const { doneAt, dueDate, createdBy, projectId, workerUserId, status, name } = task

    const data = new Task(name, createdBy, status, dueDate, doneAt, projectId, workerUserId)

    const [createdTask] = await this.db(this.table).insert(data).returning('*');

    return createdTask;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.db(this.table).select('*');
    return tasks;
  }
  async findByProjectId(projectId: number): Promise<Task[]> {
    return this.db(this.table).where({ project_id: projectId });
  }

  findByWorkerUserId(workerUserId: number): Promise<Task[]> {
    return this.db(this.table).where({ worker_user_id: workerUserId });
  }

  async findById(id: number): Promise<Task | null> {
    const task = await this.db(this.table).where({ id }).first();
    return task || null;
  }

  async findAllByUserAndStatus(
    userId: number,
    status: TaskStatus,
  ): Promise<Task[]> {
    const tasks = await this.db(this.table)
      .where({ worker_user_id: userId, status })
      .select('*');
    return tasks;
  }


  async getTasksByUser(id: number): Promise<any[]> {
    try {
      // First, verify that the user exists
      const user = await this.db('users').where({ id }).first();


      console.log({ user });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const tasks = await this.db(this.table)
        .join('projects', 'tasks.project_id', 'projects.id')
        .select(
          'tasks.id as task_id',
          'tasks.name as task_name', // Ensure 'name' column exists
          'tasks.due_date',
          'tasks.status',
          'projects.id as project_id',
          'projects.name as project_name',
        )
        .where('tasks.worker_user_id', id)
        .orderBy('projects.id');

      console.log({ tasks })

      // Group tasks by project
      const groupedTasks = tasks.reduce((acc, task) => {
        const { project_id, project_name, project_description } = task;
        if (!acc[project_id]) {
          acc[project_id] = {
            projectId: project_id,
            projectName: project_name,
            projectDescription: project_description,
            tasks: [],
          };
        }
        acc[project_id].tasks.push({
          taskId: task.task_id,
          taskName: task.task_name,
          dueDate: task.due_date,
          status: task.status,
        });
        return acc;
      }, {});

      return Object.values(groupedTasks);
    } catch (error) {
      console.log(error.code)
      console.log(error.message)

    }
  }


  async update(id: number, task: Partial<Task>): Promise<void> {
    await this.db(this.table).where({ id }).update(task);
  }

  async delete(id: number): Promise<void> {
    await this.db(this.table).where({ id }).del();
  }
}
