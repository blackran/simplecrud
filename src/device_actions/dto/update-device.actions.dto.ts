import { PartialType } from '@nestjs/swagger';
import { CreateDeviceActionsDto } from './create-device.actions.dto';

export class UpdateDeviceActionsDto extends PartialType(
  CreateDeviceActionsDto,
) {}
