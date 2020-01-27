import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleModel } from 'tools/models/role.model';
import { RoleDto } from 'tools/dtos/role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async CreateRole(@Body() body: RoleDto): Promise<RoleModel> {
    return this.roleService.create(body);
  }

  @Get()
  async getAllRoles(): Promise<RoleModel[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  async GetRole(@Param() params): Promise<RoleModel> {
    return this.roleService.findOne(params.id);
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() roleDto: RoleDto,
  ): Promise<RoleModel> {
    return this.roleService.update(id, roleDto);
  }

  @Delete(':id')
  async removeRole(@Param('id') id: string): Promise<RoleModel> {
    return this.roleService.delete(id);
  }
}
