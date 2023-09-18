import { Injectable } from '@nestjs/common';
// import { MinioClientService } from 'src/minio/minio.service';
import { BufferedFile} from 'src/minio/file.model';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Upload } from './upload.schema';

@Injectable()
export class FileUploadService {
  constructor(
    // private minioClientService: MinioClientService,
    // @InjectModel(Upload.name)
    // private uploadModel: Mongoose.Model<Upload>
  ) { }

  async uploadSingle(image: BufferedFile) {

    // let uploaded_image = await this.minioClientService.upload(image)
    // function buat create ke db
    // url nya itu uploaded_image.url

    return {
      // image_url: uploaded_image.url,
      message: "Successfully uploaded to MinIO S3"
    }
  }

  async uploadMany(files: BufferedFile) {

    let image1 = files['image1'][0]
    // let uploaded_image1 = await this.minioClientService.upload(image1)

    let image2 = files['image2'][0]
    // let uploaded_image2 = await this.minioClientService.upload(image2)

    return {
      // image1_url: uploaded_image1.url,
      // image2_url: uploaded_image2.url,
      message: 'Successfully uploaded multiple image on MinioS3'
    }
  }

}