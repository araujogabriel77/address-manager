import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entity/user';
import { UserRepositoryInterface } from './repository/user-repository';
import { UserRepository } from 'src/infra/repositories/user/user.repository';
import { UpdateUserDto } from './dtos/update-user.dto';

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

  async update(id: number, data: UpdateUserDto, currentUser: User): Promise<User> {
    if(id !== currentUser.id) {
      throw new UnauthorizedException('O ID informado não corresponde ao ID do usuário.');
    }
    return await this.usersRepository.update(id, data);
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.usersRepository.delete(id);
    return { message: 'O usuário foi removido com sucesso.' };
  }
}
