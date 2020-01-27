import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityTypeModel } from 'tools/models/activity-type.model';
import { ActivityTypeDto } from 'tools/dtos/activity-type.dto';
import { ResourceService } from 'libs/services/resource.service';

@Injectable()
export class ActivityTypeService extends ResourceService<
  ActivityTypeModel,
  ActivityTypeDto,
  ActivityTypeDto
> {
  constructor(
    @InjectModel('ActivityType')
    activityTypeMongo: Model<ActivityTypeModel>,
  ) {
    super(activityTypeMongo);
  }
}
