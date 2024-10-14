import { Project } from '@common/entities/project.entity';

export const IProjectRepository = Symbol('IProjectRepository');

export interface IProjectRepository {
  create(project: Project): Promise<Project>;
  findAll(): Promise<Project[] | null>;
  findById(id: number): Promise<Project | null>;
  findAllByOrganization(orgId: number): Promise<Project[]>;
  update(id: number, project: Partial<Project>): Promise<void>;
  delete(id: number): Promise<void>;
}
