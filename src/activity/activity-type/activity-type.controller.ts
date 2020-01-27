import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ActivityTypeService } from './activity-type.service';
import { ActivityTypeDto } from 'tools/dtos/activity-type.dto';
import { ActivityTypeModel } from 'tools/models/activity-type.model';

@Controller('activity-type')
export class ActivityTypeController {
  constructor(private readonly activityTypeService: ActivityTypeService) {}

  @Post()
  async CreateActivityType(
    @Body() body: ActivityTypeDto,
  ): Promise<ActivityTypeModel> {
    return this.activityTypeService.create(body);
  }

  @Get()
  async getAllActivityTypes(): Promise<ActivityTypeModel[]> {
    return this.activityTypeService.findAll();
  }

  @Get(':id')
  async GetActivityType(@Param() params): Promise<ActivityTypeModel> {
    return this.activityTypeService.findOne(params.id);
  }

  @Put(':id')
  async updateActivityType(
    @Param('id') id: string,
    @Body() activityTypeDto: ActivityTypeDto,
  ): Promise<ActivityTypeModel> {
    return this.activityTypeService.update(id, activityTypeDto);
  }

  @Delete(':id')
  async removeActivityType(
    @Param('id') id: string,
  ): Promise<ActivityTypeModel> {
    return this.activityTypeService.delete(id);
  }
}
