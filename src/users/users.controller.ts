import { Controller, Post, Body, Get, Param, UseGuards, ForbiddenException, Req } from '@nestjs/common';
import { UserService } from './users.service';
import { RegisterUserDto } from './decorators/registerUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { AbilityFactory } from './ability.factory';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { Action } from '../casl/actions.enum';
import { Subjects } from '../casl/subjects.enum';
import { ReadPolicyHandler } from '../casl/policy/handlers/read.policy-handler';
import { AppAbility } from 'src/casl/casl-ability.factory';

@Controller('users')
@UseGuards(JwtAuthGuard, PoliciesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly abilityFactory: AbilityFactory,
  ) {}

  private validateConditions(conditions: string): boolean {
    try {
      JSON.parse(conditions);
      return true;
    } catch {
      return false;
    }
  }

  // Admin only endpoint
  @Post()
  @CheckPolicies({ action: Action.Create, subject: Subjects.User })
  async create(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  // Regular user can access their own profile
  @Get(':id')
  @CheckPolicies({ 
    action: Action.ReadOwn, 
    subject: Subjects.User,
    conditions: { id: ':id' }
  })
  findOne(@Param('id') id: string, @Req() req) {
    // Additional check in controller if needed
    if (req.user.roles.includes('admin') || req.user.id === id) {
      return this.userService.findOne(id);
    }
    throw new ForbiddenException('Cannot access this resource');
  }



  // @Get(':id')
  // @CheckPolicies({
  //   action: Action.Read,
  //   subject: Subjects.User,
  // })
  // findOne(@Param('id') id: string) {
  //   // Implementation
  // }

  // @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  // async findById(@Param('id') id: number) {
  //   return this.userService.findById(id);
  // }
}
