import { PipeTransform, Injectable, NotFoundException, Inject } from '@nestjs/common';
import { AddressRepository } from 'src/infra/repositories/address/address.repository';
import { AddressRepositoryInterface } from '../repository/address-repository';

@Injectable()
export class AddressIdExistPipe implements PipeTransform<any> {
  constructor(
    @Inject(AddressRepository)
    private readonly addressRepository: AddressRepositoryInterface,
  ) {}

  async transform(id: number): Promise<number> {
    const address = await this.addressRepository.findOneById(id);

    if (!address) {
      throw new NotFoundException(
        'Endereço não encontrado',
        `Não foi possível encontrar um endereço com o ID: ${id}`,
      );
    }

    return id;
  }
}
