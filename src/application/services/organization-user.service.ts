import { CreateUserDto } from "@application/dto/create-user.dto";
import { IOrganizationRepository } from "@interfaces/repositories/IOrganizationRepository";
import { IOrganizationUserRepository } from "@interfaces/repositories/IOrganizationUserRepository";
import { IUserRepository } from "@interfaces/repositories/IUserRepository";
import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';

@Injectable()
export class OrganizationUserService {
  constructor(
    @Inject('IOrganizationUserRepository')
    private readonly organizationUserRepository: IOrganizationUserRepository,

    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,

  ) { }


  async createUserToOrganization(orgId: number, createUserDto: CreateUserDto) {


    const user = await this.userRepository.create(createUserDto);
    console.log({ user })
    await this.organizationUserRepository.addUserToOrganization(orgId, user.id);
  }

  async removeUserFromOrganization(orgId: number, userId: number) {
    const organizationUser = await this.organizationUserRepository.removeUserFromOrganization(orgId, userId);

    if (!organizationUser) {
      throw new NotFoundException(`User with ID ${userId} is not associated with organization ${orgId}`);
    }
    return organizationUser;
  }

  async deleteOrganization(orgId: number) {
    const organization = await this.organizationRepository.findById(orgId);

    if (!organization) {
      throw new NotFoundException(`This organization not found`);
    }

    await this.organizationRepository.delete(orgId);

    return organization
  }

  async getUsersByOrganization(orgId: number) {
    return this.organizationUserRepository.getUsersByOrganization(orgId);
  }

  async getOrganizationsByUser(userId: number) {
    return this.organizationRepository.getOrganizationsByUser(userId);
  }
}
