import { Organization } from '@common/entities/organization.entity';

export const IOrganizationRepository = Symbol('IOrganizationRepository');

export interface IOrganizationRepository {
  create(organization: Organization): Promise<Organization>;
  findById(id: number): Promise<Organization | null>;
  findAll(): Promise<Organization[]>;
  getUsersByOrganization(id: number): Promise<any[]>;
  getOrganizationsByUser(id: number): Promise<any[]>;
  update(id: number, organization: Partial<Organization>): Promise<void>;
  delete(id: number): Promise<void>;
}
