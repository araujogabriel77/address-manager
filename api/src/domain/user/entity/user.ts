
import { Address } from '../../address/entity/address';
import { genSalt , hash, compare } from 'bcryptjs';

export class User {
  private _id: number;
  private _name: string;
  private _email: string;
  private _password: string;
  private _addresses?: Address[];

  constructor(name: string, email: string, password: string) {
    this._name = name;
    this._email = email;
    this._password = password;
    this.validate();
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get addresses(): Address[] | undefined {
    return this._addresses;
  }

  validate(): void {
    if (!this._name.length) {
      throw new Error("Name is required");
    }
    if (!this.email.length) {
      throw new Error("Email is required");
    }
    if (!this._password?.length) {
      throw new Error("Password is required");
    }
  }

  public update(id: number, data: Omit<User, 'password'>): void {
    this._id = id;
    this._name = data.name;
    this._email = data.email;
  }

  public updatePassword(password: string): void {
    this._password = password;
    this.hashPassword();
  }

  async hashPassword(): Promise<void> {
    const salt = await genSalt();
    this._password = await hash(this._password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this._password);
  }

  set addresses(value: Address[]) {
    this._addresses = value;
  }
}
