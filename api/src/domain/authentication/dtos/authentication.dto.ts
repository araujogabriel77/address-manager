import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticationDto {
  @ApiProperty({
    description: 'Email do usuário',
    type: 'string',
    example: 'teste@test.com',
    required: true,
  })
  @IsString({ message: 'O e-mail precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio.' })
  @IsEmail({}, { message: 'O e-mail precisa ser um e-mail válido.' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    type: 'string',
    example: 'SenhaForte(*&#@!123)',
    required: true,
  })
  @IsString({ message: 'A senha precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'A senha não pode ser vazio.' })
  password: string;
}
