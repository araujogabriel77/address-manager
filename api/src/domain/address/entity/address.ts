export class Address {
  private readonly _id: number;
  private readonly _zipCode: string;
  private readonly _street: string;
  private readonly _complement?: string;
  private readonly _neighborhood: string;
  private readonly _number: string;
  private readonly _city: string;
  private readonly _uf: string;
  private readonly _userId: number;

  constructor(
      zipCode: string,
      street: string,
      complement: string | undefined,
      neighborhood: string,
      number: string,
      city: string,
      uf: string,
      userId: number,
  ) {
      this._zipCode = zipCode;
      this._street = street;
      this._complement = complement;
      this._neighborhood = neighborhood;
      this._number = number;
      this._city = city;
      this._uf = uf;
      this._userId = userId;
  }

  public get id(): number {
      return this._id;
  }

  public get zipCode(): string {
      return this._zipCode;
  }

  public get street(): string {
      return this._street;
  }

  public get complement(): string | undefined {
      return this._complement;
  }

  public get neighborhood(): string {
      return this._neighborhood;
  }

  public get number(): string {
      return this._number;
  }

  public get city(): string {
      return this._city;
  }

  get uf(): string {
      return this._uf;
  }

  get userId(): number {
      return this._userId;
  }

  public fullAddress(): string {
      return `${this._street}, ${this._number}, ${this._neighborhood}, ${this._city} - ${this._uf}, ${this._zipCode}`;
  }
}
