import { IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignUserToTaskDto {
  @ApiProperty({
    description: 'The ID of the task to assign the user to',
    example: 1
  })
  @IsNumber()
  readonly taskId: number;

  @ApiProperty({
    description: 'The ID of the user (employee) to assign to the task',
    example: 1
  })
  @IsNumber()
  readonly userId: number;
}
