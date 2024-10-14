import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({ example: 'TEST ', description: 'The name of the project' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '2',
    description: 'The ID of the organization which created this project',
  })
  @IsNumber()
  @IsOptional()
  orgId?: number;

  @ApiProperty({
    example: '2',
    description: 'The ID of the user who created this Project',
  })
  @IsNumber()
  @IsOptional()
  createdBy?: number;
}
