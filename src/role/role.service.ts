import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleModel } from 'tools/models/role.model';
import { RoleDto } from 'tools/dtos/role.dto';
import { ResourceService } from 'libs/services/resource.service';

@Injectable()
export class RoleService extends ResourceService<RoleModel, RoleDto, RoleDto> {
  constructor(
    @InjectModel('Role')
    roleMongo: Model<RoleModel>,
  ) {
    super(roleMongo);
  }
}
