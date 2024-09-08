import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'CEP do endereço, composto por 8 caracteres.',
    example: '12345678',
    minLength: 8,
    maxLength: 8,
  })
  @IsString({ message: 'O cep precisa ser do tipo texto.' })
  @Length(8, 8, { message: 'O cep precisa ter 8 caracteres.' })
  @IsNotEmpty({ message: 'O cep não pode ser vazio.' })
  zipCode: string;

  @ApiProperty({
    description: 'Nome da cidade, deve ter entre 2 e 255 caracteres.',
    example: 'São Paulo',
    minLength: 2,
    maxLength: 255,
  })
  @IsString({ message: 'A cidade precisa ser do tipo texto.' })
  @MinLength(2, { message: 'A cidade precisa ter no mínimo 2 caracteres.' })
  @MaxLength(255, { message: 'A cidade precisa ter no máximo 255 caracteres.' })
  @IsNotEmpty({ message: 'A cidade não pode ser vazio.' })
  city: string;

  @ApiProperty({
    description: 'UF do estado, composto por 2 caracteres.',
    example: 'SP',
    minLength: 2,
    maxLength: 2,
  })
  @IsString({ message: 'A UF precisa ser do tipo texto.' })
  @Length(2, 2, { message: 'A UF precisa ter 2 caracteres.' })
  @IsNotEmpty({ message: 'A UF não pode ser vazia.' })
  uf: string;

  @ApiPropertyOptional({
    description: 'Complemento do endereço (opcional).',
    example: 'Apto 101',
  })
  @IsOptional()
  @IsString({ message: 'O complemento precisa ser do tipo texto.' })
  complement: string;

  @ApiProperty({
    description: 'Nome do bairro, deve ter entre 2 e 255 caracteres.',
    example: 'Centro',
    minLength: 2,
    maxLength: 255,
  })
  @IsString({ message: 'O bairro precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'O bairro não pode ser vazio.' })
  @MinLength(2, { message: 'O bairro precisa ter no mínimo 2 caracteres.' })
  @MaxLength(255, { message: 'O bairro precisa ter no máximo 255 caracteres.' })
  neighborhood: string;

  @ApiProperty({
    description: 'Número do endereço, deve ter entre 1 e 6 caracteres.',
    example: '123',
    minLength: 1,
    maxLength: 6,
  })
  @IsNotEmpty({ message: 'O número não pode ser vazio.' })
  @MinLength(1, { message: 'O número precisa ter no mínimo 1 caracter.' })
  @MaxLength(6, { message: 'O número precisa ter no máximo 6 caracteres.' })
  number: string;

  @ApiProperty({
    description: 'Nome da rua, deve ter entre 2 e 255 caracteres.',
    example: 'Rua Exemplo',
    minLength: 2,
    maxLength: 255,
  })
  @IsString({ message: 'A rua precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'A rua não pode ser vazia.' })
  @MinLength(2, { message: 'A rua precisa ter no mínimo 2 caracteres.' })
  @MaxLength(255, { message: 'A rua precisa ter no máximo 255 caracteres.' })
  street: string;
}
