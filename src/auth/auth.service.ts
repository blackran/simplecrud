import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
// import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailDto } from './dto/reset.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    return this.userService.create(<Prisma.UserCreateInput>registerDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }
    // Compare password
    const isPasswordMatching = await bcrypt.compare(
      password,
      user.user_password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }
    // Verify if the user is actif
    if (!user.user_actived) {
      throw new UnauthorizedException();
    }
    // Remove password
    delete user.user_password;
    // Return the user
    return user;
  }

  async resetPassword(emailDto: EmailDto) {
    const user = await this.userService.findByEmail(emailDto.user_email);
    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }
    delete user.user_password;
    // delete user.role;
    const addSub = { sub: user.user_id };

    const payload = { ...addSub, ...user };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async getUserById(user_id: number) {
    const user = await this.userService.findOne(user_id);
    delete user.user_password;
    return user;
  }

  async login(user: any) {
    const payload = { user_email: user.user_email, sub: user.user_id };
    return this.jwtService.sign(payload);
  }
}
