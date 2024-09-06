import { PipeTransform, Injectable, NotFoundException, Inject } from '@nestjs/common';
import { UserRepository } from 'src/infra/repositories/user/user.repository';
import { UserRepositoryInterface } from '../repository/user-repository';

@Injectable()
export class UserIdExistPipe implements PipeTransform<any> {
  constructor(
    @Inject(UserRepository)
    private readonly usersRepository: UserRepositoryInterface,
  ) {}

  async transform(id: number): Promise<number> {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado', `Não foi possível encontrar um usuário com o ID: ${id}`);
    }

    return id;
  }
}
