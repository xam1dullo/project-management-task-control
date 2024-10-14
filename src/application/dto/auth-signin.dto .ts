import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'qwer12345',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
