import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import environment from 'tools/environment/environment';
import { LibsModule } from 'libs/libs.module';
import { TicketTypeModule } from './ticket/ticket-type/ticket-type.module';
import { InventoryTypeModule } from './inventory/inventory-type/inventory-type.module';
import { ActivityTypeModule } from './activity/activity-type/activity-type.module';
import { ProductTypeModule } from './product/product-type/product-type.module';
import { TicketModule } from './ticket/ticket.module';
import { InventoryModule } from './inventory/inventory.module';
import { GroupModule } from './group/group.module';
import { ActivityModule } from './activity/activity.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    ProductModule,
    ActivityModule,
    GroupModule,
    InventoryModule,
    TicketModule,
    ProductTypeModule,
    ActivityTypeModule,
    InventoryTypeModule,
    TicketTypeModule,
    LibsModule,
    MongooseModule.forRoot(environment.mongoUrl),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
