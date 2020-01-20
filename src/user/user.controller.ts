import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: UserCreateDto): Promise<UserModel> {
    return await this.userService.create(body);
  }

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUser(@Param() params): Promise<UserModel> {
    return await this.userService.findOne(params.id);
  }

  @Put(':id')
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
