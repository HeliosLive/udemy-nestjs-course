import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupModel } from 'tools/models/group.model';
import { GroupCreateDto } from 'tools/dtos/group.dto';
import { ResourceService } from 'libs/services/resource.service';

@Injectable()
export class GroupService extends ResourceService<
  GroupModel,
  GroupCreateDto,
  GroupCreateDto
> {
  constructor(
    @InjectModel('Group')
    groupMongo: Model<GroupModel>,
  ) {
    super(groupMongo);
  }
}
