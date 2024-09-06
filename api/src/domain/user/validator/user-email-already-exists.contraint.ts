import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

let service: UsersService;

@ValidatorConstraint({ name: 'UsersEmailAlreadyExist', async: true })
export class UsersEmailAlreadyExist implements ValidatorConstraintInterface, OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit(): void {
    service = this.moduleRef.get(UsersService);
  }
  async validate(email: string, validationArguments: ValidationArguments): Promise<boolean> {
    const dto = Object.assign(validationArguments.object);
    const entity = await service.emailAlreadyExists(dto?.id, dto?.email);
    return !entity;
  }
}
