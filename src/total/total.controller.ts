import { Controller, Get } from '@nestjs/common';
import { UserModel } from 'tools/models/user.model';
import { TotalService } from './total.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('total')
@Controller('total')
export class TotalController {
  constructor(private totalService: TotalService) {}

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return await this.totalService.findAll();
  }
}
