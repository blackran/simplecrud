import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  user_lastname: string;

  @ApiProperty()
  user_name?: string;

  @ApiProperty()
  @IsEmail()
  user_email: string;

  @ApiProperty()
  @IsNotEmpty()
  user_password: string;

  @ApiProperty()
  user_actived?: number;
}
