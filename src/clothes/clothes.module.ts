import { Module } from '@nestjs/common';
import { BookController } from './clothes.controller';
import { ClothesService } from './clothes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClothesSchema } from './schemas/clothes.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Clothes', schema: ClothesSchema }])
  ],
  controllers: [BookController],
  providers: [ClothesService],
})
export class ClothesModule { }
