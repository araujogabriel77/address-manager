import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entity/user';
import { UsersService } from './users.service';
import { UserIdExistPipe } from './pipes/user-exists.pipe';
import { AuthGuard } from 'src/shared/guards/authentication.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    return await this.service.create(data);
  }

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
