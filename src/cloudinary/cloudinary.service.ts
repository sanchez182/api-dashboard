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
      if (data.oldImage !== '') {
        this.deleteImage([data.oldImage]);
      }
      const upload = v2.uploader.upload_stream(
        {
          folder: data.folder,
          upload_preset: 'restaurantAccess',
        },
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
  }

  /*   async deleteImage(public_id: string): Promise<any> {
    return new Promise(async (resolve) => {
      v2.uploader
        .destroy(public_id)
        .then((response) => {
          //TODO aca algo si falla ok
          resolve(true);
        })
        .catch((error) => {
          //TODO aca algo si falla
          //reject(error);
        });
    });
  }
} */

  async deleteImage(public_id: any[]): Promise<any> {
    return new Promise(async (resolve) => {
      v2.api
        .delete_resources(public_id)
        .then((response) => {
          //TODO aca algo si falla ok
          resolve(true);
        })
        .catch((error) => {
          //TODO aca algo si falla
          //reject(error);
        });
    });
  }
}
