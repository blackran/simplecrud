import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiProperty()
  @IsEmail()
  user_email: string;

  @ApiProperty()
  @IsString()
  url: string;
}
