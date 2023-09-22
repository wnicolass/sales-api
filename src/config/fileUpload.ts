import { resolve } from 'node:path';
import { randomBytes } from 'node:crypto';
import { StorageEngine, diskStorage } from 'multer';

interface s3Config {
  aws: Record<'bucket', string>;
}

interface IUploadConfig {
  driver: 's3' | 'disk' | string;
  tempFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  s3: s3Config;
}

function setupMulter() {
  const uploadsFolder = resolve(__dirname, '..', '..', 'uploads');
  const tempFolder = resolve(__dirname, '..', '..', 'temp');

  return {
    driver: process.env.STORAGE_DRIVER ?? 'disk',
    tempFolder,
    directory: uploadsFolder,
    multer: {
      storage: diskStorage({
        destination: tempFolder,
        filename(request, file, callback) {
          const bytesAsHex = randomBytes(8).toString('hex');
          const filename = `${bytesAsHex}-${file.originalname}`;

          callback(null, filename);
        },
      }),
    },
    s3: {
      aws: {
        bucket: 'nwgl-sales-api',
      },
    },
  } satisfies IUploadConfig;
}

export const multerConfig = setupMulter();
