import { DataSource } from 'typeorm';
import { Seeder, runSeeders } from 'typeorm-extension';
import { UsersSeed } from './seeds/create-users.seed';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [UsersSeed],
    });
  }
}
