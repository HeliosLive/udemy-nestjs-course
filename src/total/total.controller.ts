import { Controller, Get } from '@nestjs/common';
import { UserModel } from 'tools/models/user.model';
import { TotalService } from './total.service';

@Controller('total')
export class TotalController {
  constructor(private totalService: TotalService) {}

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return await this.totalService.findAll();
  }
}
