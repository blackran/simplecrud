import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  user_name: string;

  @ApiProperty()
  user_lastname: string;

  @ApiProperty()
  @IsEmail()
  user_email: string;

  @ApiProperty()
  @IsNotEmpty()
  user_password?: string;

  @ApiProperty()
  user_actived?: number;

  @ApiProperty()
  user_created_at: string;
  user_updated_at: string;
}
