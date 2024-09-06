import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AddressRepository } from 'src/infra/repositories/address/address.repository';
import { AddressRepositoryInterface } from './repository/address-repository';
import { Address } from './entity/address';
import { CreateAddressDto } from './dtos/create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject(AddressRepository)
    private readonly addressesRepository: AddressRepositoryInterface,
  ) {}

  async findAll(userId: number): Promise<Address[]> {
    return await this.addressesRepository.findAll(userId);
  }

  async findById(id: number): Promise<Address> {
    return await this.addressesRepository.findOneById(id);
  }

  async create(data: CreateAddressDto, userId: number): Promise<Address> {
    return await this.addressesRepository.create(data, userId);
  }

  async update(id: number, data: CreateAddressDto, userId: number): Promise<Address> {
    const address = await this.addressesRepository.findOneById(id);

    if(address.userId !== userId) {
      throw new UnauthorizedException('Você não tem permissão para alterar este endereço.');
    }

    return await this.addressesRepository.update(id, data);
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.addressesRepository.delete(id);
    return { message: 'O endereço foi removido com sucesso.' };
  }
}
