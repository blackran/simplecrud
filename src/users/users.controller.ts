import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-authentication.guard';
import { PrismaHelperService } from 'src/helper/prisma-helper/prisma-helper.service';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private prismaHelperService: PrismaHelperService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(<Prisma.UserCreateInput>createUserDto);
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  async findAll(@Query('args') prismaArgs: string) {
    const usersWithPassword = await this.usersService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
    const userWithoutPassword = usersWithPassword.map((item) => {
      delete item.user_password;
      return item;
    });
    return userWithoutPassword;
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  async findOne(@Param('id') id: number, @Query('args') prismaArgs: string) {
    const user = await this.usersService.findOne(
      +id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, <Prisma.UserUpdateInput>updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
