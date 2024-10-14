import {
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsString,
  MinLength,
  isNumber,
  IsNumber,
} from 'class-validator';
import { UserRole } from '@domain/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    example: UserRole.ADMIN,
    description: 'The role of the user',
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  @IsEnum(UserRole, {
    message: 'Role must be either EMPLOYEE,  ADMIN, or MANAGER',
  })
  @IsNotEmpty()
  role?: UserRole = UserRole.EMPLOYEE;

  @ApiProperty({
    example: '2',
    description: 'The ID of the user who created this account',
  })
  @IsNumber()
  @IsNotEmpty()
  createdBy?: string;
}
