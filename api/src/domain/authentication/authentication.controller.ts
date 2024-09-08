import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationDto } from './dtos/authentication.dto';
import { AuthenticationService } from './authentication.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @ApiOkResponse({
    description: 'Retorna um objeto com o token de acesso.',
    content: {
      'application/json': {
        schema: {
          type: 'string',
          description: 'Token de acesso do usuário.',
          example: { accessToken: 'token' },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'As credenciais estão incorretas.' })
  @ApiNotFoundResponse({ description: 'Não existe um usuário cadastrado com o email fornecido.' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() data: AuthenticationDto): Promise<{ accessToken: string }> {
    return await this.service.singIn(data);
  }
}
