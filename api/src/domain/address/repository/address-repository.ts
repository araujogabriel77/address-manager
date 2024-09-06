import RepositoryInterface from "src/shared/repository/repository.interface";
import { Address } from "../entity/adress";

interface AddressData {
  zipCode: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  street: string;
  uf: string;
}

export interface AddressRepositoryInterface extends Omit<RepositoryInterface<Address>, 'create'> {
  create(data: AddressData, userId: number): Promise<Address>;
  update(id: number, data: AddressData): Promise<Address>;
}
