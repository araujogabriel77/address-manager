import { DataSource } from 'typeorm';
import { Seeder, runSeeders } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [],
    });
  }
}
