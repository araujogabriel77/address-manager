import { Inject, Injectable } from '@nestjs/common';
import { AddressRepository } from 'src/infra/repositories/address/address.repository';
import { AddressRepositoryInterface } from './repository/address-repository';
import { Address } from './entity/adress';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject(AddressRepository)
    private readonly addressesRepository: AddressRepositoryInterface,
  ) {}

  async findAll(): Promise<Address[]> {
    return await this.addressesRepository.findAll();
  }

  async findById(id: number): Promise<Address> {
    return await this.addressesRepository.findOneById(id);
  }

  async create(data: CreateAddressDto, userId: number): Promise<Address> {
    return await this.addressesRepository.create(data, userId);
  }

  async update(id: number, data: UpdateAddressDto): Promise<Address> {
    return await this.addressesRepository.update(id, data);
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.addressesRepository.delete(id);
    return { message: 'O endereço foi removido com sucesso.' };
  }
}
