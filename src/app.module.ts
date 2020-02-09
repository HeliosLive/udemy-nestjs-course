import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
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
import { TotalModule } from './total/total.module';
import { LoginModule } from './login/login.module';
import { TokenMiddleware } from 'libs/middlewares/token.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'libs/guards/auth.guard';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';

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
    TotalModule,
    LoginModule,
    UploadModule,
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forRoot(environment.mongoUrl),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
