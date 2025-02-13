import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs'; // Changed from bcrypt to bcryptjs
import { RegisterDto } from '../auth/dto/register.dto';
import { RolesGlobal, isValidRole } from '../casl/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // async register(signupUserDto: SignupUserDto): Promise<User> {
  //   if (signupUserDto.roles !== 'regularuser' && signupUserDto.roles !== 'registereduser') {
  //     throw new BadRequestException('Only regularuser and registereduser role is allowed');
  //   }
  //   const { username, password, roles } = signupUserDto;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = this.usersRepository.create({
  //     username,
  //     password: hashedPassword,
  //     roles: [roles],
  //   });
  //   return this.usersRepository.save(user);
  // }

  async create(registerDto: RegisterDto): Promise<User> {
    const { username, password } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      roles: [RolesGlobal.REGULAR_USER],
    });

    return this.usersRepository.save(user);
  }


  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }


}
