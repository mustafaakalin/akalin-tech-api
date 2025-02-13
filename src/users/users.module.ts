import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AbilityFactory } from './ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, AbilityFactory],
  controllers: [UserController],
})
export class UserModule {}
