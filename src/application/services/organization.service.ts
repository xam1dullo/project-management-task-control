import { CreateOrganizationDto } from '@application/dto/create-organization.dto';
import { UpdateOrganizationDto } from '@application/dto/update-organization.dto';
import { Organization } from '@common/entities/organization.entity';
import { IOrganizationRepository } from '@interfaces/repositories/IOrganizationRepository';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) { }

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const organization = new Organization(
      createOrganizationDto.name,
      createOrganizationDto.createdBy
    );
    return this.organizationRepository.create(organization);


  }

  async findAll(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }

  async findById(id: number): Promise<Organization> {
    const organization = await this.organizationRepository.findById(id);
    if (!organization) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }
    return organization;
  }

  async update(
    id: number,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<void> {
    const existingOrganization = await this.organizationRepository.findById(id);
    if (!existingOrganization) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }

    await this.organizationRepository.update(id, { ...updateOrganizationDto });
  }

  async delete(id: number): Promise<void> {
    const existingOrganization = await this.organizationRepository.findById(id);
    if (!existingOrganization) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }
    await this.organizationRepository.delete(id);
  }

  async getUsersByOrganization(id: number) {
    return this.organizationRepository.getUsersByOrganization(id)
  }
}
