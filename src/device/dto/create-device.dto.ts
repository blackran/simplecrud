import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  dvc_name?: string;

  @ApiProperty()
  @IsOptional()
  dvc_description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  dvc_created_at?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  dvc_updated_at?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  state_state_id?: number;

  @ApiProperty()
  @IsOptional()
  user_user_id?: number;
}
