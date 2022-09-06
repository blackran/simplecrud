import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceActionsDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  dact_name?: string;

  @ApiProperty()
  @IsOptional()
  dact_description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  dact_date?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  dact_created_at?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  dact_updated_at?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  device_dvc_id?: number;
}
