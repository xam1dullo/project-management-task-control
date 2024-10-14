import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { KNEX } from '../postgres/constants/postgres';
import { Knex } from 'knex';
import { IProjectRepository } from '@interfaces/repositories/IProjectRepository';
import { Project } from '@common/entities/project.entity';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  private readonly table = "projects"
  constructor(@Inject(KNEX) private readonly db: Knex) { }

  async create(project: Project): Promise<Project> {
    try {
      const proInfo = await this.db(this.table)
        .where({ name: project.name })
        .first();


      if (proInfo) {
        throw new ConflictException('Projects already exists');
      }


      const [createdProject] = await this.db(this.table)
        .insert({
          name: project.name,
          created_by: project.createdBy,
          org_id: project.orgId,
        })
        .returning('*');

      return createdProject;

    } catch (error) {

      if (error.code === '23505') {
        // Handle unique constraint violations if any
        throw new ConflictException('Project name already exists');
      }


      if (error.code === '23503') {
        // Handle unique constraint violations if any
        throw new ConflictException('orgination id  or user id  does not  exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Project[] | null> {
    const projects = await this.db(this.table).select('*');
    return projects || null;
  }
  async findById(id: number): Promise<Project | null> {
    const project = await this.db(this.table).where({ id }).first();
    return project || null;
  }

  async findAllByOrganization(orgId: number): Promise<Project[]> {
    const projects = await this.db(this.table)
      .where({ org_id: orgId })
      .select('*');
    return projects;
  }

  async update(id: number, project: Partial<Project>): Promise<void> {
    await this.db(this.table).where({ id }).update(project);
  }

  async delete(id: number): Promise<void> {
    await this.db(this.table).where({ id }).del();
  }
}
