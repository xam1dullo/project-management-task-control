
const IOrganizationUserRepository = Symbol('IOrganizationUserRepository');

export interface IOrganizationUserRepository {
  addUserToOrganization(orgId: number, userId: number): Promise<any>;
  removeUserFromOrganization(orgId: number, userId: number): Promise<any>;
  getUsersByOrganization(orgId: number): Promise<any[]>;
}
