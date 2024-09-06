import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/domain/user/entity/user';
import { UserModel } from '../../../infra/repositories/user/user.model';

export class UsersSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(UserModel);

    const userData = new User('Jon Doe', 'jondoe@gmail.com', 'JonDoe1885#$@');
    await userData.hashPassword();

    const user = repository.create(userData);
    await repository.save(user);
  }
}
