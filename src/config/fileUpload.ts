import { resolve } from 'node:path';
import { randomBytes } from 'node:crypto';
import { diskStorage } from 'multer';

function setupMulter() {
  const uploadsFolder = resolve(__dirname, '..', '..', 'uploads');

  return {
    directory: uploadsFolder,
    storage: diskStorage({
      destination: uploadsFolder,
      filename(request, file, callback) {
        const bytesAsHex = randomBytes(8).toString('hex');
        const filename = `${bytesAsHex}-${file.originalname}`;

        callback(null, filename);
      },
    }),
  };
}

export const multerConfig = setupMulter();
