import RepositoryInterface from "src/shared/repository/repository.interface";
import { User } from "../entity/user";

export interface UserRepositoryInterface extends RepositoryInterface<User> {
  create(data: { name: string, email: string, password: string }): Promise<User>;
  update(id: number, data: { name: string, email: string, password: string }): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  emailAlreadyExists(currentUserId: number, email: string): Promise<boolean>;
}
