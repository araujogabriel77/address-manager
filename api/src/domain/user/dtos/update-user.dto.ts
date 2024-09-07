import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { UsersEmailAlreadyExist } from '../validator/user-email-already-exists.contraint';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'O id não pode ser vazio.' })
  @IsInt({ message: 'O id precisa ser um número inteiro.' })
  id: number;

  @IsString({ message: 'O nome precisa ser do tipo texto.' })
  @MinLength(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' })
  @MaxLength(255, { message: 'O nome precisa ter no máximo 255 caracteres.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string;

  @Validate(UsersEmailAlreadyExist, {
    message:
      'Usuário: Já existe um usuário registrado com o e-mail fornecido.',
  })
  @IsString({ message: 'O e-mail precisa ser do tipo texto.' })
  @MinLength(6, { message: 'O e-mail precisa ter no mínimo 6 caracteres.' })
  @MaxLength(255, { message: 'O e-mail precisa ter no máximo 255 caracteres.' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio.' })
  @IsEmail({}, { message: 'O e-mail precisa ser um e-mail válido.' })
  email: string;
}
