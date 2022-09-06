import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @ApiProperty()
  @IsOptional()
  state_name?: string;
}
