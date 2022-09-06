import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HelperModule } from './helper/helper.module';
import { DeviceModule } from './device/device.module';
import { StateModule } from './state/state.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    HelperModule,
    DeviceModule,
    StateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
