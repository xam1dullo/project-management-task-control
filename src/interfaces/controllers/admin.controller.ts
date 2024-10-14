import { CreateOrganizationDto } from "@application/dto/create-organization.dto";
import { CreateUserDto } from "@application/dto/create-user.dto";
import { UpdateOrganizationDto } from "@application/dto/update-organization.dto";
import { OrganizationUserService } from "@application/services/organization-user.service";
import { OrganizationService } from "@application/services/organization.service";
import { UserService } from "@application/services/user.service";
import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('ADMIN')
@Controller('admin/organizations/')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly organizationService: OrganizationService,
    private readonly organizationUserService: OrganizationUserService

  ) { }


  @Post(":orgId/users")
  @ApiOperation({ summary: 'Add a user to an organization' })
  @ApiParam({ name: 'orgId', description: 'The organization ID', type: Number })
  @ApiBody({ schema: { example: { name: "ali", createdBy: 123, role: 'ADMIN' } } })
  @ApiResponse({ status: 201, description: 'User added to organization successfully' })
  async createUser(
    @Param('orgId') orgId: number,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.organizationUserService.createUserToOrganization(
      orgId,
      createUserDto,
    );
  }


  @Get(":orgId/users")
  @ApiOperation({ summary: 'Get all users in an organization' })
  @ApiParam({ name: 'orgId', description: 'The organization ID', type: Number })
  @ApiResponse({ status: 200, description: 'List of users in the organization' })
  async getUsersByOrganization(@Param('orgId') orgId: number) {
    return this.organizationUserService.getUsersByOrganization(orgId);
  }

  // @Put(':orgId/users/:userId')
  // async updateUser(
  //   @Param('userId') userId: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return this.userService.updateUser(userId, updateUserDto);
  // }

  @Delete(':orgId/users/:userId')
  @ApiOperation({ summary: 'Remove a user from an organization' })
  @ApiParam({ name: 'orgId', description: 'The organization ID', type: Number })
  @ApiParam({ name: 'userId', description: 'The user ID to remove', type: Number })
  @ApiResponse({ status: 200, description: 'User removed from organization successfully' })
  async removeUserFromOrganization(@Param('orgId') orgId: number, @Body('userId') userId: number) {

    return this.organizationUserService.removeUserFromOrganization(orgId, userId);
  }


  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiBody({ type: CreateOrganizationDto })
  @ApiResponse({ status: 201, description: 'Organization created successfully' })
  async createOrganization(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({ status: 200, description: 'List of all organizations' })
  async findAllOrganizations() {
    return this.organizationService.findAll();
  }

  // Get an organization by ID
  @Get(':orgId')
  @ApiOperation({ summary: 'Get an organization by ID' })
  @ApiParam({ name: 'orgId', description: 'The organization ID', type: Number })
  @ApiResponse({ status: 200, description: 'Organization found' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async findOrganizationById(@Param('orgId') orgId: number) {
    return this.organizationService.findById(orgId);
  }

  // Update an organization by ID
  @Put(':orgId')
  @ApiOperation({ summary: 'Update an organization by ID' })
  @ApiParam({ name: 'orgId', description: 'The organization ID', type: Number })
  @ApiBody({ type: UpdateOrganizationDto })
  @ApiResponse({ status: 200, description: 'Organization updated successfully' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async updateOrganization(
    @Param('orgId') orgId: number,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(orgId, updateOrganizationDto);
  }
  @ApiOperation({ summary: 'Delete an organization by ID' })
  @ApiParam({ name: 'orgId', description: 'The organization ID', type: Number })
  @ApiResponse({ status: 200, description: 'Organization deleted successfully' })
  @ApiResponse({ status: 404, description: 'Organization not found' })


  @Delete(':orgId')
  @ApiOperation({ summary: 'Delete an organization by ID' })
  @ApiParam({ name: 'orgId', description: 'The organization ID', type: Number })
  @ApiResponse({ status: 200, description: 'Organization deleted successfully' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async deleteOrganization(@Param('orgId') orgId: number) {
    return this.organizationService.delete(orgId);
  }

}
