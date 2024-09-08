import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/authentication.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { Address } from './entity/address';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { AddressIdExistPipe } from './pipes/address-exists.pipe';
import { User } from '../user/entity/user';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Endereços')
@ApiBearerAuth() // Para indicar que as rotas são protegidas por token JWT ou similar
@UseGuards(AuthGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @ApiOperation({ summary: 'Obter todos os endereços do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de endereços retornada com sucesso.', type: [Address] })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @Get()
  async findAll(@CurrentUser() user: User): Promise<Address[]> {
    return await this.service.findAll(user.id);
  }

  @ApiOperation({ summary: 'Obter um endereço específico por ID' })
  @ApiParam({ name: 'id', description: 'ID do endereço', type: Number })
  @ApiResponse({ status: 200, description: 'Endereço retornado com sucesso.', type: Address })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Address> {
    return await this.service.findById(id);
  }

  @ApiOperation({ summary: 'Criar um novo endereço' })
  @ApiResponse({ status: 201, description: 'Endereço criado com sucesso.', type: Address })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @Post()
  async create(@Body() data: CreateAddressDto, @CurrentUser() user: User): Promise<Address> {
    return await this.service.create(data, user.id);
  }

  @ApiOperation({ summary: 'Atualizar um endereço existente' })
  @ApiParam({ name: 'id', description: 'ID do endereço', type: Number })
  @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso.', type: Address })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe, AddressIdExistPipe) id: number,
    @Body() data: CreateAddressDto,
    @CurrentUser() user: User,
  ): Promise<Address> {
    return await this.service.update(id, data, user.id);
  }

  @ApiOperation({ summary: 'Remover um endereço' })
  @ApiParam({ name: 'id', description: 'ID do endereço', type: Number })
  @ApiResponse({ status: 200, description: 'Endereço removido com sucesso.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe, AddressIdExistPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<{ message: string }> {
    return await this.service.delete(id, user.id);
  }
}
