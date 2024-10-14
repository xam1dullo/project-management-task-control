import { AssignUserToTaskDto } from "@application/dto/assign-user-to-task.dto";
import { CreateProjectDto } from "@application/dto/create-project.dto";
import { CreateTaskDto } from "@application/dto/create-task.dto";
import { UpdateProjectDto } from "@application/dto/update-project.dto";
import { UpdateTaskDto } from "@application/dto/update-task.dto";
import { ProjectService } from "@application/services/project.service";
import { TaskService } from "@application/services/task.service";
import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('MANAGER')
@Controller('manager')
export class ManagerController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
  ) { }

  // Project CRUD

  @Post('projects')
  @ApiOperation({ summary: 'Create a new project' })
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Put('projects/:projectId')
  @ApiOperation({ summary: 'Update an existing project' })
  async updateProject(@Param('projectId') projectId: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(projectId, updateProjectDto);
  }

  @Delete('projects/:projectId')
  @ApiOperation({ summary: 'Delete a project' })
  async deleteProject(@Param('projectId') projectId: number) {
    return this.projectService.delete(projectId);
  }

  @Get('projects')
  @ApiOperation({ summary: 'Get all projects' })
  async getAllProjects() {
    return this.projectService.findAll();
  }

  @Post('projects/:projectId/tasks')
  @ApiOperation({ summary: 'Create a new task' })
  async createTaskInProject(
    @Param('projectId') projectId: number,
    @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createInProject(createTaskDto, projectId);
  }

  // Task CRUD

  @Get('findAllTasksGroupedByProjects')
  @ApiOperation({ summary: 'find All Tasks Grouped B yProjects' })
  async findAllTasksGroupedByProjects() {
    return this.taskService.findAllTasksGroupedByProjects();
  }

  @Post('tasks')
  @ApiOperation({ summary: 'Create a new task' })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Post('tasks/assignedTo')
  @ApiOperation({ summary: 'Create a new task' })
  async assignedTo(@Body() assignUserToTaskDto: AssignUserToTaskDto) {
    return this.taskService.assignUserToTask(assignUserToTaskDto);
  }

  @Put('tasks/:taskId')
  @ApiOperation({ summary: 'Update a task' })
  async updateTask(@Param('taskId') taskId: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(taskId, updateTaskDto);
  }

  @Delete('tasks/:taskId')
  @ApiOperation({ summary: 'Delete a task' })
  async deleteTask(@Param('taskId') taskId: number) {
    return this.taskService.delete(taskId);
  }

  @Get('projects/:projectId/tasks')
  @ApiOperation({ summary: 'Get all tasks by project' })
  async getTasksByProject(@Param('projectId') projectId: number) {
    return this.taskService.findByProjectId(projectId);
  }
}
