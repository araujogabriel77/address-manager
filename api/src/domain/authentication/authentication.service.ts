import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationDto } from './dtos/authentication.dto';
import { UsersService } from '../user/users.service';
import { User } from '../user/entity/user';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async singIn(data: AuthenticationDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new NotFoundException('Não existe um usuário cadastrado com o email fornecido.');
    }
    const userData = new User(user.name, user.email, user.password);
    const checkPassword = await userData.comparePassword(data.password);

    if (!checkPassword) {
      throw new UnauthorizedException('As credenciais estão incorretas.');
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
