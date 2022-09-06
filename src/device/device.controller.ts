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
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-authentication.guard';
import { PrismaHelperService } from 'src/helper/prisma-helper/prisma-helper.service';

@ApiTags('Devices')
@Controller('devices')
@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private prismaHelperService: PrismaHelperService,
  ) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(<Prisma.DeviceCreateInput>createDeviceDto);
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  findAll(@Query('args') prismaArgs: string) {
    return this.deviceService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return this.deviceService.findOne(
      +id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(
      +id,
      <Prisma.DeviceUpdateInput>updateDeviceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
