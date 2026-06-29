import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects.');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants incorrects.');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const refreshToken = crypto.randomBytes(32).toString('hex');
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async refresh(refreshToken: string) {
    const users = await this.usersService.findAll();
    let foundUser: any = null;

    for (const user of users) {
      const userWithToken = await this.usersService.findByIdWithRefreshToken(user.id);
      if (userWithToken?.refreshToken) {
        const isValid = await bcrypt.compare(refreshToken, userWithToken.refreshToken);
        if (isValid) {
          foundUser = userWithToken;
          break;
        }
      }
    }

    if (!foundUser) {
      throw new UnauthorizedException('Refresh token invalide ou expiré.');
    }

    const newRefreshToken = crypto.randomBytes(32).toString('hex');
    const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 10);
    await this.usersService.updateRefreshToken(foundUser.id, hashedNewRefreshToken);

    const payload = { email: foundUser.email, sub: foundUser.id, role: foundUser.role };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: newRefreshToken,
    };
  }

  async logout(userId: string): Promise<void> {
    await this.usersService.updateRefreshToken(userId, null);
  }
}
