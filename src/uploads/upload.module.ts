import { Module } from '@nestjs/common';
import { FileUploadService } from './upload.service';
import { FileUploadController } from './upload.controller';
import { MinioClientModule } from 'src/minio/minio.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadSchema } from './upload.schema';
// import { MinioClientService } from 'src/minio/minio.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'minio', schema: UploadSchema}]),
    MinioClientModule
  ],
  providers: [FileUploadService],
  controllers: [FileUploadController]
})
export class FileUploadModule {}