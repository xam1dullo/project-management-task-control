import { CreateTaskDto } from '@application/dto/create-task.dto';
import { UpdateTaskDto } from '@application/dto/update-task.dto';
import { TaskService } from '@application/services/task.service';
import { Task } from '@common/entities/task.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
    type: Task,
  })
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks.',
    type: [Task],
  })
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }



  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The task.',
    type: Task,
  })
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findById(Number(id));
  }

  @Get('employee/:id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the employee' })
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The task.',
    type: Task,
  })
  async getTasksByEmployee(@Param('id') id: number) {
    return this.taskService.findTasksByUser(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
  })
  update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<void> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  delete(@Param('id') id: number): Promise<void> {
    return this.taskService.delete(id);
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get tasks by Project ID' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks for the project.',
    type: [Task],
  })
  findByProjectId(@Param('projectId') projectId: number): Promise<Task[]> {
    return this.taskService.findByProjectId(projectId);
  }

  @Get('worker/:workerUserId')
  @ApiOperation({ summary: 'Get tasks by Worker User ID' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks assigned to the worker.',
    type: [Task],
  })
  findByWorkerUserId(
    @Param('workerUserId') workerUserId: number,
  ): Promise<Task[]> {
    return this.taskService.findByWorkerUserId(workerUserId)
  }
}
