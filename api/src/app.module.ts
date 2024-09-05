import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions, DataSource } from 'typeorm';
import { TypeOrmConfigService } from './infra/database/typeorm-config.service';
import appConfig from './infra/config/app.config';
import databaseConfig from './infra/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 40,
    }]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
