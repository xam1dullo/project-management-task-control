import { CreateProjectDto } from '@application/dto/create-project.dto';
import { ProjectService } from '@application/services/project.service';
import { Project } from '@common/entities/project.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    status: 201,
    description: 'The project has been successfully created.',
    type: Project,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    console.log({ createProjectDto });

    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({
    status: 200,
    description: 'List of projects.',
    type: [Project],
  })
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'The project.', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  findOne(@Param('id') id: number): Promise<Project> {
    return this.projectService.findById(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiOperation({ summary: 'Update project by ID' })
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  update(
    @Param('id') id: number,
    @Body() updateProjectDto: any,
  ): Promise<void> {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiOperation({ summary: 'Delete project by ID' })
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  delete(@Param('id') id: number): Promise<void> {
    return this.projectService.delete(id);
  }
}
