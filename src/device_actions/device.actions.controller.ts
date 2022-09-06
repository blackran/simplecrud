import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DeviceActionsService } from './device.actions.service';
import { CreateDeviceActionsDto } from './dto/create-device.actions.dto';
import { UpdateDeviceActionsDto } from './dto/update-device.actions.dto';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-authentication.guard';
import { PrismaHelperService } from 'src/helper/prisma-helper/prisma-helper.service';

@ApiTags('DeviceActions')
@Controller('deviceActions')
@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
export class DeviceActionsController {
  constructor(
    private readonly deviceActionsService: DeviceActionsService,
    private prismaHelperService: PrismaHelperService,
  ) {}

  @Post()
  create(@Body() createDeviceActionsDto: CreateDeviceActionsDto) {
    return this.deviceActionsService.create(
      <Prisma.DeviceActionCreateInput>createDeviceActionsDto,
    );
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  findAll(@Query('args') prismaArgs: string) {
    return this.deviceActionsService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return this.deviceActionsService.findOne(
      +id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeviceActionsDto: UpdateDeviceActionsDto,
  ) {
    return this.deviceActionsService.update(
      +id,
      <Prisma.DeviceActionUpdateInput>updateDeviceActionsDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceActionsService.remove(+id);
  }
}
