import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationDto } from './dtos/authentication.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() data: AuthenticationDto,
  ): Promise<{ accessToken: string }> {
    return await this.service.singIn(data);
  }
}
