import { Module } from '@nestjs/common';
import { DeviceActionsService } from './device.actions.service';
import { DeviceActionsController } from './device.actions.controller';

@Module({
  controllers: [DeviceActionsController],
  providers: [DeviceActionsService],
})
export class DeviceActionsModule {}
