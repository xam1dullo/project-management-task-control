// src/interfaces/controllers/organization.controller.ts
import { CreateOrganizationDto } from '@application/dto/create-organization.dto';
import { UpdateOrganizationDto } from '@application/dto/update-organization.dto';
import { OrganizationService } from '@application/services/organization.service';
import { Organization } from '@common/entities/organization.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationController {

  constructor(private readonly organizationService: OrganizationService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({
    status: 201,
    description: 'The organization has been successfully created.',
    type: Organization,
  })
  create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({
    status: 200,
    description: 'List of organizations.',
    type: [Organization],
  })
  findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'The organization.',
    type: Organization,
  })
  findOne(@Param('id') id: number): Promise<Organization> {
    return this.organizationService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully updated.',
  })
  update(
    @Param('id') id: number,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<void> {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully deleted.',
  })
  delete(@Param('id') id: number): Promise<void> {
    return this.organizationService.delete(id);
  }
}
