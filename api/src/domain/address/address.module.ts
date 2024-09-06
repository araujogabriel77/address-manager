import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressIdExistPipe } from './pipes/address-exists.pipe';
import { AddressModel } from 'src/infra/repositories/address/address.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from 'src/infra/repositories/address/address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AddressModel])],
  controllers: [AddressController],
  providers: [AddressRepository, AddressService, AddressIdExistPipe],
  exports: [],
})
export class AddressModule {}
