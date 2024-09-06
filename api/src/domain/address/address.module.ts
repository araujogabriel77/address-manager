import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
  imports: [],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [],
})
export class AddressModule {}
