import { Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { OrganizationService } from "./organization.service";
import { CreateOrganizationDto } from "@application/dto/create-organization.dto";
import { UpdateOrganizationDto } from "@application/dto/update-organization.dto";
import { UserService } from "./user.service";
import { CreateUserDto } from "@application/dto/create-user.dto";
import { UpdateUserDto } from "@application/dto/update-user.dto";

@Injectable()
export class AdminService {
  constructor(


    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(forwardRef(() => OrganizationService))
    private readonly organizationService: OrganizationService,
  ) { }



  //USER
  async createUser(createUserDto: CreateUserDto, organizationId: number): Promise<any> {
    const organization = await this.organizationService.findById(organizationId);

    if (!organization) {
      throw new NotFoundException(`Organization with ID ${organizationId} not found`);
    }

    return this.userService.create(createUserDto);
  }

  async getUsersByOrganization(organizationId: number) {
    return this.organizationService.getUsersByOrganization(organizationId);
  }


  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.userService.update(userId, updateUserDto);
  }

  async deleteUser(userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.userService.delete(userId);
  }

  async createOrganization(createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  async getAllOrganizations() {
    return this.organizationService.findAll();
  }

  async getOrganizationById(id: number) {
    const organization = await this.organizationService.findById(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }

  async updateOrganization(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  async deleteOrganization(id: number) {
    return this.organizationService.delete(id);
  }
}
