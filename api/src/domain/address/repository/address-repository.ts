import RepositoryInterface from "src/shared/repository/repository.interface";
import { Address } from "../entity/adress";

export interface AddressRepositoryInterface extends Omit<RepositoryInterface<Address>, 'create'> {
  create(data: Address, userId: number): Promise<Address| void>;
}
