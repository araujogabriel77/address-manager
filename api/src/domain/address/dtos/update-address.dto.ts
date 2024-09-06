import { IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class UpdateAddressDto {
  @IsNotEmpty({message: 'O id não pode ser vazio.'})
  @IsInt({message: 'O id precisa ser um número inteiro.'})
  id: number;

  @IsString({message: 'O cep precisa ser do tipo texto.'})
  @Length(8, 8, {message: 'O cep precisa ter 8 caracteres.'})
  @IsNotEmpty({message: 'O cep não pode ser vazio.'})
  zipCode: string;

  @IsString({message: 'A cidade precisa ser do tipo texto.'})
  @MinLength(2, {message: 'A cidade precisa ter no mínimo 2 caracteres.'})
  @MaxLength(255, {message: 'A cidade precisa ter no máximo 255 caracteres.'})
  @IsNotEmpty({message: 'A cidade não pode ser vazio.'})
  city: string;

  @IsString({message: 'A UF precisa ser do tipo texto.'})
  @Length(2, 2, {message: 'A UF precisa ter 2 caracteres.'})
  @IsNotEmpty({message: 'A UF não pode ser vazia.'})
  uf: string;

  @IsOptional()
  @IsString({message: 'O complemento precisa ser do tipo texto.'})
  complement: string;

  @IsString({message: 'O bairro precisa ser do tipo texto.'})
  @IsNotEmpty({message: 'O bairro não pode ser vazio.'})
  @MinLength(2, {message: 'O bairro precisa ter no mínimo 2 caracteres.'})
  @MaxLength(255, {message: 'O bairro precisa ter no máximo 255 caracteres.'})
  neighborhood: string;

  @IsNotEmpty({message: 'O número não pode ser vazio.'})
  @MinLength(1, {message: 'O número precisa ter no mínimo 1 caracter.'})
  @MaxLength(6, {message: 'O número precisa ter no máximo 6 caracteres.'})
  number: string;

  @IsString({message: 'A rua precisa ser do tipo texto.'})
  @IsNotEmpty({message: 'A rua não pode ser vazia.'})
  @MinLength(2, {message: 'A rua precisa ter no mínimo 2 caracteres.'})
  @MaxLength(255, {message: 'A rua precisa ter no máximo 255 caracteres.'})
  street: string;
}
