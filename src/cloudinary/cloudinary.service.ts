import { UploadImageDto } from './dto/upload-image.dto';
import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    data: UploadImageDto,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: data.folder, upload_preset: 'restaurantAccess' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async getImageList(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      v2.search
        .expression('folder=restaurant4')
        .sort_by('public_id', 'desc')
        .execute()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
    // const data = v2.url('restaurant4.json', { type: 'list' });

    /*      const upload = v2.image('folder1/folder2/non_existing_id.png', {
        transformation: [
          { width: 100, crop: 'scale' },
          { default_image: 'docs:placeholders:samples:avatar.png' },
        ],
      }); */
  }
}