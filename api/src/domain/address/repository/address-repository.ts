import RepositoryInterface from "src/shared/repository/repository.interface";
import { Address } from "../entity/address";

interface AddressData {
  zipCode: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  street: string;
  uf: string;
}

export interface AddressRepositoryInterface extends Omit<RepositoryInterface<Address>, 'create' | 'findAll'> {
  create(data: AddressData, userId: number): Promise<Address>;
  update(id: number, data: AddressData): Promise<Address>;
  findAll(userId: number): Promise<Address[]>;
}
