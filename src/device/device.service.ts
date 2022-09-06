import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateDeviceDto } from './dto/create-device.dto';
// import { UpdateDeviceDto } from './dto/update-device.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private prismaService: PrismaService) {}
  async create(createDeviceActions: Prisma.DeviceCreateInput) {
    const states = createDeviceActions.state as any;
    const users = createDeviceActions.user as any;

    const deviceActions = await this.prismaService.device.create({
      data: createDeviceActions,
      include: {
        state: true,
        user: true,
      },
    });

    if (!!states.state_id) {
      const new_state = await this.prismaService.state.upsert({
        where: {
          state_id: states.state_id,
        },
        update: {},
        create: {
          ...states,
        },
      });

      await this.prismaService.device.update({
        where: {
          dvc_id: deviceActions.dvc_id,
        },
        data: {
          state: {
            connect: {
              state_id: new_state.state_id,
            },
          },
        },
      });
    }

    if (!!users.user_id) {
      const new_user = await this.prismaService.user.upsert({
        where: {
          user_id: users.user_id,
        },
        update: {},
        create: {
          ...users,
        },
      });

      await this.prismaService.device.update({
        where: {
          dvc_id: deviceActions.dvc_id,
        },
        data: {
          user: {
            connect: {
              user_id: new_user.user_id,
            },
          },
        },
      });
    }

    return deviceActions;
  }

  async findAll(prismaArgs: Prisma.DeviceArgs = {}) {
    const deviceActions = await this.prismaService.device.findMany({
      ...prismaArgs,
    });
    return deviceActions;
  }

  async findOne(dvc_id: number, prismaArgs: Prisma.DeviceArgs = {}) {
    const deviceActions = await this.prismaService.device.findUnique({
      where: { dvc_id },
      ...prismaArgs,
    });

    if (!deviceActions) {
      throw new NotFoundException(`device with id : ${dvc_id} not found`);
    }
    return deviceActions;
  }

  async update(
    dvc_id: number,
    updateDeviceActionsDto: Prisma.DeviceUpdateInput,
  ) {
    await this.findOne(dvc_id);

    const states = updateDeviceActionsDto.state as any;
    const users = updateDeviceActionsDto.user as any;

    const updatedDeviceActions = await this.prismaService.device.update({
      where: { dvc_id },
      data: updateDeviceActionsDto,
      include: {
        state: true,
        user: true,
      },
    });

    if (!!states.state_id) {
      const new_state = await this.prismaService.state.upsert({
        where: {
          state_id: states.state_id,
        },
        update: {},
        create: {
          ...states,
        },
      });

      await this.prismaService.device.update({
        where: {
          dvc_id: dvc_id,
        },
        data: {
          state: {
            connect: {
              state_id: new_state.state_id,
            },
          },
        },
      });
    }

    if (!!users.user_id) {
      const new_user = await this.prismaService.user.upsert({
        where: {
          user_id: users.user_id,
        },
        update: {},
        create: {
          ...users,
        },
      });

      await this.prismaService.device.update({
        where: {
          dvc_id: dvc_id,
        },
        data: {
          user: {
            connect: {
              user_id: new_user.user_id,
            },
          },
        },
      });
    }

    return updatedDeviceActions;
  }

  async remove(dvc_id: number) {
    await this.findOne(dvc_id);
    return this.prismaService.device.delete({ where: { dvc_id } });
  }
}
