import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions, DataSource } from 'typeorm';
import { TypeOrmConfigService } from './infra/database/typeorm-config.service';
import appConfig from './infra/config/app.config';
import databaseConfig from './infra/config/database.config';
import { UsersModule } from './domain/user/users.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthenticationModule } from './domain/authentication/authentication.module';
import { AllExceptionsFilter } from './infra/filters/all-exception.filter';
import { AddressModule } from './domain/address/address.module';

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
    AuthenticationModule,
    UsersModule,
    AddressModule,
  ],
  controllers: [],
  providers: [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
],
})
export class AppModule {}
