import RepositoryInterface from "src/shared/repository/repository.interface";
import { User } from "../entity/user";

interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface UserRepositoryInterface extends RepositoryInterface<User> {
  create(data: UserData): Promise<User>;
  update(id: number, data: UserData): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  emailAlreadyExists(currentUserId: number, email: string): Promise<boolean>;
}
