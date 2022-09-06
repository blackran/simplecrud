import {
  ConflictException,
  Injectable,
  NotFoundException,
  // ParseBoolPipe,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    let createdUser: any;
    try {
      const hasedPassword = await bcrypt.hash(
        createUserDto.user_password,
        await bcrypt.genSalt(10),
      );
      createUserDto.user_password = hasedPassword;
      createdUser = await this.prismaService.user.create({
        data: createUserDto,
        include: {
          device: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exist');
        }
      }
    }
    return createdUser;
  }

  async findAll(prismaArgs: Prisma.UserArgs = {}) {
    const users = await this.prismaService.user.findMany({ ...prismaArgs });
    return users;
  }

  async findOne(user_id: number, prismaArgs: Prisma.UserArgs = {}) {
    const user = await this.prismaService.user.findUnique({
      where: { user_id },
      ...prismaArgs,
      include: {
        device: true,
      },
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  async findByEmail(user_email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        user_email: user_email,
      },
      include: {
        device: true,
      },
    });
    if (user) {
      return user;
    } else {
      return false;
    }
  }

  async update(user_id: number, updateUserDto: any) {
    if (updateUserDto.user_password) {
      const hasedPassword = await bcrypt.hash(
        updateUserDto.user_password,
        await bcrypt.genSalt(10),
      );
      updateUserDto.user_password = hasedPassword;
    }
    await this.findOne(user_id);
    const updatedUser = await this.prismaService.user.update({
      where: {
        user_id,
      },
      include: {
        device: true,
      },
      data: updateUserDto,
    });
    return updatedUser;
  }

  async remove(user_id: number) {
    await this.findOne(user_id);
    return this.prismaService.user.delete({
      where: {
        user_id,
      },
    });
  }
}
