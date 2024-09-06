import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { UsersEmailAlreadyExist } from '../validator/user-email-already-exists.contraint';

export class CreateUserDto {
  @IsString({message: 'O nome precisa ser do tipo texto.'})
  @MinLength(3, {message: 'O nome precisa ter no mínimo 3 caracteres.'})
  @MaxLength(255, {message: 'O nome precisa ter no máximo 255 caracteres.'})
  @IsNotEmpty({message: 'O nome não pode ser vazio.'})
  name: string;

  @Validate(UsersEmailAlreadyExist, {
    message:
      'Usuário: Já existe um usuário registrado com o e-mail fornecido. Por favor altere o e-mail para realizar a operação.',
  })
  @IsString({message: 'O e-mail precisa ser do tipo texto.'})
  @MinLength(6, {message: 'O e-mail precisa ter no mínimo 6 caracteres.'})
  @MaxLength(255, {message: 'O e-mail precisa ter no máximo 255 caracteres.'})
  @IsNotEmpty({message: 'O e-mail não pode ser vazio.'})
  @IsEmail({}, {message: 'O e-mail precisa ser um e-mail válido.'})
  email: string;

  @IsString()
  @MinLength(6, {message: 'A senha precisa ter no mínimo 6 caracteres.'})
  @MaxLength(255, {message: 'A senha precisa ter no máximo 255 caracteres.'})
  @IsNotEmpty({message: 'A senha não pode ser vazia.'})
  password: string;
}
