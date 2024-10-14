import { Inject, Injectable } from '@nestjs/common';
import { KNEX } from '../postgres/constants/postgres';
import { Knex } from 'knex';
import { IOrganizationUserRepository } from "@interfaces/repositories/IOrganizationUserRepository";


@Injectable()
export class OrganizationUserRepository implements IOrganizationUserRepository {
  private table = 'organization_users';
  constructor(@Inject(KNEX) private readonly db: Knex) { }


  async addUserToOrganization(orgId: number, userId: number): Promise<any> {
    return this.db(this.table)
      .insert({ org_id: orgId, user_id: userId })
      .returning('*'); // Return the inserted record
  }

  // Remove a user from an organization
  async removeUserFromOrganization(orgId: number, userId: number): Promise<any> {
    return this.db(this.table)
      .where({ org_id: orgId, user_id: userId })
      .del();
  }

  // Get all users in an organizatiorg_idon
  async getUsersByOrganization(orgId: number): Promise<any[]> {
    return this.db('users')
      .join('organization_users', 'users.id', 'organization_users.user_id')
      .where('organization_users.org_id', orgId)
      .select('users.*'); // Return user details
  }

  // Get all organizations for a user
  async getOrganizationsByUser(userId: number): Promise<any[]> {
    return this.db('organizations')
      .join('organization_users', 'organizations.id', 'organization_users.org_id')
      .where('organization_users.user_id', userId)
      .select('organizations.*'); // Return organization details
  }

}
