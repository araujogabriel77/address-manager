export type Address = {
  id: number;
  zipCode: string;
  street: string;
  complement?: string;
  neighborhood: string;
  number: string;
  city: string;
  uf: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type AddressFormData = {
  id?: number;
  zipCode: string;
  street: string;
  complement?: string;
  neighborhood: string;
  number: string;
  city: string;
  uf: string;
}