import { UserRepositoryInterface } from 'src/domain/user/repository/user-repository';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { User } from '../../../domain/user/entity/user';
import { HttpException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new NotFoundException('Não foi possível encontrar os usuários.');
    }
  }

  async findOneById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Não foi possível encontrar o usuário com o id fornecido.');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new NotFoundException('Não foi possível encontrar o usuário com o email fornecido.');
    }
  }

  async emailAlreadyExists(currentUserId: number, email: string): Promise<boolean> {
    try {
      let id = currentUserId || 0;
      const user = await this.userRepository.findOne({
        where: {
          email,
          id: Not(id)
        },
        select: ['email'],
      });

      return !!user;
    } catch (error) {
      throw new NotFoundException('Não foi possível encontrar o usuário com o email fornecido.');
    }
  }

  async create(data: User): Promise<User> {
    try {
      const user = new User(data.name, data.email, data.password);
      const model = this.userRepository.create(user)
      await user.hashPassword();
      return await this.userRepository.save(model);
    } catch (error) {
      if(!(error instanceof HttpException)) {
        throw error;
      }
      throw new InternalServerErrorException('Não foi possível criar o usuário.');
    }
  }

  async update(id: number, data: User): Promise<User> {
    try {
      const user = this.userRepository.create({
        id,
        ...data,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      if(!(error instanceof HttpException)) {
        throw error;
      }
      throw new InternalServerErrorException('Não foi possível atualizar o usuário.');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.userRepository.delete({ id });
    } catch (error) {
      if(!(error instanceof HttpException)) {
        throw error;
      }
      throw new InternalServerErrorException('Não foi possível remover o usuário.');
    }
  }
}
