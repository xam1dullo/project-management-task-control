import {
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsDate,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '@domain/enums';

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'Status of the task', enum: TaskStatus })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'Due date for the task',
    type: Date,
    format: 'date-time',
  })
  @IsOptional()
  @IsDate({ message: 'dueDate must be a valid Date' })
  dueDate?: Date;

  @ApiPropertyOptional({ description: 'Worker User ID' })
  @IsOptional()
  @IsNumber()
  workerUserId?: number;
}
