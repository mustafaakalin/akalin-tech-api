import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs'; // Changed from bcrypt to bcryptjs
import { RegisterUserDto } from './decorators/registerUser.dto';
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

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { username, password, roles } = registerUserDto;

    // Check if roles is an array and has more than one role
    if (Array.isArray(roles) && roles.length > 1) {
      throw new BadRequestException(
        'Only one role can be assigned during registration',
      );
    }

    const role = Array.isArray(roles) ? roles[0] : roles;

    // Validate single role
    if (!isValidRole(role)) {
      throw new BadRequestException(
        `Invalid role. Must be one of: ${Object.values(RolesGlobal).join(', ')}`,
      );
    }

    // Ensure only REGULAR_USER is allowed during registration
    if (role !== RolesGlobal.REGULAR_USER) {
      throw new BadRequestException(
        'Only regularuser role is allowed during registration',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      roles: [role], // Store as array with single role
    });

    return this.usersRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  // Kullanıcıyı id ile bulma
  // async findById(id: string): Promise<User | undefined> {
  //   return this.usersRepository.findOne(id);
  // }
}
