import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEmailAlreadyExist } from './validator/user-email-already-exists.contraint';
import { UserModel } from 'src/infra/repositories/user/user.model';
import { UserRepository } from 'src/infra/repositories/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UserRepository, UsersService, UsersEmailAlreadyExist],
  exports: [],
})
export class UsersModule {}
