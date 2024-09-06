import { IsEmail, IsString } from 'class-validator';

export class AuthenticationDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
