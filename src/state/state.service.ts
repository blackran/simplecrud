import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StateService {
  constructor(private prismaService: PrismaService) { }

  async create(createState: Prisma.StateCreateInput) {
    return await this.prismaService.state.create({
      data: createState,
    });
  }

  async findAll(prismaArgs: Prisma.StateArgs = {}) {
    const states = await this.prismaService.state.findMany({
      ...prismaArgs,
    });
    return states;
  }

  async findOne(state_id: number, prismaArgs: Prisma.StateArgs = {}) {
    const state = await this.prismaService.state.findUnique({
      where: { state_id },
      ...prismaArgs,
    });

    if (!state) {
      throw new NotFoundException(`state with id : ${state_id} not found`);
    }
    return state;
  }

  async update(state_id: number, updateStateDto: Prisma.StateUpdateInput) {
    await this.findOne(state_id);
    const updatedState = await this.prismaService.state.update({
      where: { state_id },
      data: updateStateDto,
    });
    return updatedState;
  }

  async remove(state_id: number) {
    await this.findOne(state_id);
    return this.prismaService.state.delete({ where: { state_id } });
  }
}
