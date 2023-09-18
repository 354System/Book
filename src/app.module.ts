import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users/roles.guard';
import { RmqModule } from './rmq/rmq.module';
import { OrderModule } from './order/order.module';
import { FileUploadModule } from './uploads/upload.module';
import { MinioClientModule } from './minio/minio.module';
import { ProductModule } from './Product/product.module';


@Module({
  imports: [
  ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
  ProductModule,
  AuthModule,
  UsersModule,
  RmqModule,
  OrderModule,
  FileUploadModule,
  MinioClientModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}