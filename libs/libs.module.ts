import { Module } from '@nestjs/common';
import { ResourceService } from './services/resource.service';

@Module({
  imports: [],
  providers: [ResourceService],
})
export class LibsModule {}
