import { IsNotEmpty, IsNumber, isNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'TEST ', description: 'The name of the project' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2',
    description: 'The ID of the organization which created this project',
  })
  @IsNotEmpty()
  @IsNumber()
  orgId: number;

  @ApiProperty({
    example: '2',
    description: 'The ID of the user who created this Project',
  })
  @IsNotEmpty()
  @IsNumber()
  createdBy: number;
}
