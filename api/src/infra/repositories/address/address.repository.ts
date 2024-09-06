import { AddressRepositoryInterface } from 'src/domain/address/repository/address-repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Address } from 'src/domain/address/entity/address';
import { AddressModel } from './address.model';

export class AddressRepository implements AddressRepositoryInterface {
  private logger = new Logger(this.constructor.name);
  constructor(
    @InjectRepository(AddressModel)
    private readonly addressRepository: Repository<Address>,

  ) {}

  async findAll(userId: number): Promise<Address[]> {
    try {
      return await this.addressRepository.find({
        where: {
          userId,
        }
      });
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('Não foi possível encontrar os endereços.');
    }
  }

  async findOneById(id: number): Promise<Address> {
    try {
      return await this.addressRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Não foi possível encontrar o endereço com o id fornecido.');
    }
  }

  async create(data: Address, userId: number): Promise<Address> {
    try {
      const {
        zipCode,
        city,
        complement,
        neighborhood,
        number,
        street,
        uf
      } = data;
      const address = new Address(
        zipCode,
        city,
        complement,
        neighborhood,
        number,
        street,
        uf,
        userId
      );
      const model = this.addressRepository.create(address)
      return await this.addressRepository.save(model);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Não foi possível criar o endereço.');
    }
  }

  async update(id: number, data: Address): Promise<Address> {
    try {
      const address = this.addressRepository.create({
        id,
        ...data,
      });

      return await this.addressRepository.save(address);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Não foi possível atualizar o endereço.');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.addressRepository.delete({ id });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Não foi possível remover o endereço.');
    }
  }
}
