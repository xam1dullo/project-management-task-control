import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { KNEX } from '../postgres/constants/postgres';
import { Knex } from 'knex';
import { Organization } from '@common/entities/organization.entity';
import { IOrganizationRepository } from '@interfaces/repositories/IOrganizationRepository';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  private table = 'organizations';
  constructor(@Inject(KNEX) private readonly db: Knex) { }

  async create(organization: Organization): Promise<Organization> {
    const orgInfo = await this.db(this.table)
      .where({ name: organization.name })
      .first();

    if (orgInfo) {
      throw new ConflictException('Organizations already exists');
    }

    const [createdOrganization] = await this.db(this.table)
      .insert({
        name: organization.name,
        created_by: organization.createdBy,
      })
      .returning('*');

    return new Organization(createdOrganization.id, createdOrganization.name);

  }

  async findById(id: number): Promise<Organization | null> {
    const organization = await this.db(this.table).where({ id }).first();
    return organization || null;
  }

  async findAll(): Promise<Organization[]> {
    const organizations = await this.db(this.table).select('*');
    return organizations;
  }

  async update(id: number, organization: Partial<Organization>): Promise<void> {
    await this.db(this.table).where({ id }).update(organization);
  }

  async delete(id: number): Promise<void> {
    await this.db(this.table).where({ id }).del();
  }


  async getUsersByOrganization(orgId: number): Promise<any[]> {
    const data = await this.db('users')
      .join('organization_user', 'users.id', 'organization_user.user_id')
      .where('organization_user.org_id', orgId)
      .select('users.*'); // Return user details

    return data || null;
  }
  async getOrganizationsByUser(userId: number): Promise<any[]> {
    const data = await this.db(this.table)
      .join('organization_user', 'organizations.id', 'organization_user.org_id')
      .where('organization_user.user_id', userId)
      .select('organizations.*');

    return data || null;
  }
}
