import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'ddb12hbdl',
      api_key: '836937186177891',
      api_secret: 'GmXD8Y18vuDKIc1cf46OyhcWKGM',
    });
  },
};
