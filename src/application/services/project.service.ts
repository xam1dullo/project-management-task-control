import { CreateProjectDto } from '@application/dto/create-project.dto';
import { Project } from '@common/entities/project.entity';
import { IProjectRepository } from '@interfaces/repositories/IProjectRepository';
import { IUserRepository } from "@interfaces/repositories/IUserRepository";
import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,

    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

  ) { }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const user = await this.userRepository.findById(createProjectDto.createdBy)

    if (!["ADMIN", "MANAGER"].includes(user.role)) {
      throw new ForbiddenException('You are not allowed to access this resource.');

    }


    const project = new Project(
      createProjectDto.name,
      createProjectDto.orgId,
      createProjectDto.createdBy,
    );

    return this.projectRepository.create(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async findById(id: number): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  async update(id: number, updateProjectDto: any): Promise<void> {
    const existingProject = await this.projectRepository.findById(id);

    if (!existingProject) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    await this.projectRepository.update(id, {
      ...updateProjectDto,
      updatedAt: new Date(),
    });
  }

  async delete(id: number): Promise<void> {
    const existingProject = await this.projectRepository.findById(id);
    if (!existingProject) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    await this.projectRepository.delete(id);
  }
}
