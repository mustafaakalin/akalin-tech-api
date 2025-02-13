import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AbilityFactory } from './ability.factory';
import { CaslModule } from '../casl/casl.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CaslModule, // Add this line
    ],
  providers: [UserService, AbilityFactory],
  controllers: [UserController],
  exports: [UserService], // Add this line to export UserService
})
export class UserModule {}
