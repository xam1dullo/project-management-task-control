import {
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsString,
  MinLength,
  isNumber,
  IsNumber,
  IsInt,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { TaskStatus, UserRole } from '@domain/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'ID of the project' })
  @IsNumber()
  projectId?: number;

  @ApiProperty({
    description: 'Due date of the task',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  dueDate: Date;


  @ApiProperty({ example: 'any task', description: 'The name of the task' })
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty({
    description: 'Due date of the task',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  doneAt: Date;

  @ApiProperty({ description: 'ID of the worker user' })
  @IsInt()
  workerUserId: number;

  @ApiProperty({
    description: 'Status of the task',
    enum: TaskStatus,
    default: TaskStatus.CREATED,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({ description: 'User ID who created the task' })
  @IsNotEmpty()
  @IsNumber()
  createdBy: number;
}
