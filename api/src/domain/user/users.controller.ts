import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entity/user';
import { UsersService } from './users.service';
import { UserIdExistPipe } from './pipes/user-exists.pipe';
import { AuthGuard } from 'src/shared/guards/authentication.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({ summary: 'Obter todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.', type: [User] })
  @Get()
  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @ApiOperation({ summary: 'Obter um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiResponse({ status: 200, description: 'Usuário retornado com sucesso.', type: User })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.service.findById(id);
  }

  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.', type: User })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    return await this.service.create(data);
  }

  @ApiOperation({ summary: 'Atualizar um usuário existente' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.', type: User })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe, UserIdExistPipe) id: number,
    @Body() data: UpdateUserDto,
    @CurrentUser() user: User,
  ): Promise<User> {
    return await this.service.update(id, data, user);
  }
}
