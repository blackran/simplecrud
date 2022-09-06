import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateDeviceActionsDto } from './dto/create-device.actions.dto';
// import { UpdateDeviceActionsDto } from './dto/update-device.actions.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeviceActionsService {
  constructor(private prismaService: PrismaService) {}

  async create(createDeviceAction: Prisma.DeviceActionCreateInput) {
    const deviceAction = await this.prismaService.deviceAction.create({
      data: createDeviceAction,
    });
    return deviceAction;
  }

  async findAll(prismaArgs: Prisma.DeviceActionArgs = {}) {
    const deviceActions = await this.prismaService.deviceAction.findMany({
      ...prismaArgs,
    });
    return deviceActions;
  }

  async findOne(dact_id: number, prismaArgs: Prisma.DeviceActionArgs = {}) {
    const deviceAction = await this.prismaService.deviceAction.findUnique({
      where: { dact_id },
      ...prismaArgs,
    });

    if (!deviceAction) {
      throw new NotFoundException(`device with id : ${dact_id} not found`);
    }
    return deviceAction;
  }

  async update(
    dact_id: number,
    updateDeviceActionDto: Prisma.DeviceActionUpdateInput,
  ) {
    await this.findOne(dact_id);
    const updatedDevice = await this.prismaService.deviceAction.update({
      where: { dact_id },
      data: updateDeviceActionDto,
      include: {
        // device_dvc_id: true,
      },
    });
    return updatedDevice;
  }

  async remove(dact_id: number) {
    await this.findOne(dact_id);
    return this.prismaService.deviceAction.delete({ where: { dact_id } });
  }
}
