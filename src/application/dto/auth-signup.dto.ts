import {
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsString,
  MinLength,
  isNumber,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { UserRole } from '@domain/enums';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'qwer12345',
    description: 'The password of the user',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: UserRole.EMPLOYEE,
    description: 'The role of the user',
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  @IsEnum(UserRole, {
    message: 'Role must be either EMPLOYEE,  ADMIN, or MANAGER',
  })
  role: UserRole;

  @ApiProperty({
    example: '2',
    description: 'The ID of the user who created this account',
  })
  @IsNumber()
  @IsOptional()
  createdBy: number;
}
