import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({
    example: 'TEST ',
    description: 'The name of the organization',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2',
    description: 'The ID of the user who created this organization',
  })
  @IsNotEmpty()
  @IsNumber()
  createdBy: number;
}
