import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EmailDto } from './dto/reset.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post("/register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post("/login")
  @UseGuards(LocalAuthenticationGuard)
  async login(@Body() loginDto: LoginDto, @Request() req) {
    let user = req.user;
    const access_token = await this.authService.login(req.user);
    user.access_token = access_token;
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Get("/get-user")
  async getUser(@Request() req) {
    return req.user;
  }

  @Post("/reset-password")
  resetPassword(@Body() email: EmailDto) {
    return this.authService.resetPassword(email);
  }
}
