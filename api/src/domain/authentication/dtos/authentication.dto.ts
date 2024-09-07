import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticationDto {
  @IsString({ message: 'O e-mail precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio.' })
  @IsEmail({}, { message: 'O e-mail precisa ser um e-mail válido.' })
  email: string;


  @IsString({ message: 'A senha precisa ser do tipo texto.' })
  @IsNotEmpty({ message: 'A senha não pode ser vazio.' })
  password: string;
}
