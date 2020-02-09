import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseFilters,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';
import { FilterModel } from 'tools/models/filter.model';
import { Roles } from 'libs/decorators/role.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Roles('Admin')
  async createUser(@Body() body: UserCreateDto): Promise<UserModel> {
    body.password = await this.userService.convertToHash(body.password);
    return await this.userService.create(body);
  }

  @Get()
  async getAllUsers(@Query() query: FilterModel): Promise<UserModel[]> {
    return await this.userService.findAll(query);
  }

  @Get(':id')
  @Roles('Developer')
  async getUser(@Param() params): Promise<UserModel> {
    return await this.userService.findOne(params.id);
  }

  @Put(':id')
  @Roles('Operator')
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserModel> {
    return await this.userService.update(id, userUpdateDto);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.delete(id);
  }
}
