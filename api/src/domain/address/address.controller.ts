import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/authentication.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { Address } from './entity/address';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { AddressIdExistPipe } from './pipes/address-exists.pipe';
import { User } from '../user/entity/user';

@UseGuards(AuthGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<Address[]> {
    return await this.service.findAll(user.id);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Address> {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() data: CreateAddressDto, @CurrentUser() user: User): Promise<Address> {
    return await this.service.create(data, user.id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe, AddressIdExistPipe) id: number,
    @Body() data: CreateAddressDto,
    @CurrentUser() user: User,
  ): Promise<Address> {
    return await this.service.update(id, data, user.id);
  }
}
