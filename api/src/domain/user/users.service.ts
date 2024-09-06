import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entity/user';
import { UserRepositoryInterface } from './repository/user-repository';
import { UserRepository } from 'src/infra/repositories/user/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository)
    private readonly usersRepository: UserRepositoryInterface,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOneById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneByEmail(email);
  }

  async emailAlreadyExists(id: number, email: string): Promise<boolean> {
    return this.usersRepository.emailAlreadyExists(id, email);
  }

  async create(data: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(data);
  }

  async update(id: number, data: CreateUserDto): Promise<User | void> {
    return await this.usersRepository.update(id, data);
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.usersRepository.delete(id);
    return { message: 'O usuário foi removido com sucesso.' };
  }
}
