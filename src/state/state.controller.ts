import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-authentication.guard';
import { PrismaHelperService } from 'src/helper/prisma-helper/prisma-helper.service';

@ApiTags('States')
@Controller('states')
@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
export class StateController {
  constructor(
    private readonly stateService: StateService,
    private prismaHelperService: PrismaHelperService,
  ) {}

  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(<Prisma.StateCreateInput>createStateDto);
  }

  @Get()
  @ApiQuery({ name: 'args', required: false })
  findAll(@Query('args') prismaArgs: string) {
    return this.stateService.findAll(
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Get(':id')
  @ApiQuery({ name: 'args', required: false })
  findOne(@Param('id') id: string, @Query('args') prismaArgs: string) {
    return this.stateService.findOne(
      +id,
      this.prismaHelperService.parsePrismaArgs(prismaArgs),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.update(
      +id,
      <Prisma.StateUpdateInput>updateStateDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateService.remove(+id);
  }
}
