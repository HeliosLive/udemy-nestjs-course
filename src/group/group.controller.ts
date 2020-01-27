import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupModel } from 'tools/models/group.model';
import { GroupCreateDto } from 'tools/dtos/group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async CreateGroup(@Body() body: GroupCreateDto): Promise<GroupModel> {
    return this.groupService.create(body);
  }

  @Get()
  async getAllGroups(): Promise<GroupModel[]> {
    return this.groupService.findAll();
  }

  @Get(':id')
  async GetGroup(@Param() params): Promise<GroupModel> {
    return this.groupService.findOne(params.id);
  }

  @Put(':id')
  async updateGroup(
    @Param('id') id: string,
    @Body() groupDto: GroupCreateDto,
  ): Promise<GroupModel> {
    return this.groupService.update(id, groupDto);
  }

  @Delete(':id')
  async removeGroup(@Param('id') id: string): Promise<GroupModel> {
    return this.groupService.delete(id);
  }
}
