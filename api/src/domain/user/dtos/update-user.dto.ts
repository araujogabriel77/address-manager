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
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  @IsNotEmpty({ message: 'O id não pode ser vazio.' })
  @IsInt({ message: 'O id precisa ser um número inteiro.' })
  id: number;

  @ApiProperty({
    description: 'Nome completo do usuário',
    minLength: 3,
    maxLength: 255,
    example: 'João Silva',
  })
  @IsString({ message: 'O nome precisa ser do tipo texto.' })
  @MinLength(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' })
  @MaxLength(255, { message: 'O nome precisa ter no máximo 255 caracteres.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    minLength: 6,
    maxLength: 255,
    example: 'joao.silva@example.com',
  })
  @Validate(UsersEmailAlreadyExist, {
    message: 'Já existe um usuário registrado com o e-mail fornecido.',
  })
  @IsString({ message: 'O e-mail precisa ser do tipo texto.' })
  @MinLength(6, { message: 'O e-mail precisa ter no mínimo 6 caracteres.' })
  @MaxLength(255, { message: 'O e-mail precisa ter no máximo 255 caracteres.' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio.' })
  @IsEmail({}, { message: 'O e-mail precisa ser um e-mail válido.' })
  email: string;
}
