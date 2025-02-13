import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';  // Changed from bcrypt to bcryptjs
import { RolesGlobal } from '../casl/roles.enum';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user exists
    const userExists = await this.userService.findOne(registerDto.username);
    if (userExists) {
      throw new ConflictException('Username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user with regularUser role
    const user = await this.userService.create({
      username: registerDto.username,
      password: hashedPassword,
    });

    // Generate tokens
    const tokens = await this.getTokens(user.id.toString(), user.username);
    
    return {
      user: {
        id: user.id,
        username: user.username,
        roles: user.roles
      },
      ...tokens
    };
  }

  async login(loginDto: LoginDto) {
    // Find user
    const user = await this.userService.findOne(loginDto.username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.getTokens(user.id.toString(), user.username);

    return {
      user: {
        id: user.id,
        username: user.username,
        roles: user.roles
      },
      ...tokens
    };
  }

  private async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET || 'your-access-secret',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async logout(userId: string) {
    // Implement any cleanup needed (like invalidating refresh tokens)
    return { message: 'Logged out successfully' };
  }

//   async validateUser(username: string, password: string): Promise<any> {
//     const user = await this.userService.findOne(username);
//     if (user && await bcrypt.compare(password, user.password)) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { username: user.username, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
}