import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { rename, unlink } from 'node:fs/promises';
import { multerConfig } from '@config/fileUpload';

export class DiskStorageProvider {
  public async saveFile(filename: string): Promise<string> {
    await rename(
      resolve(multerConfig.tempFolder, filename),
      resolve(multerConfig.directory, filename),
    );

    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    const filePath = resolve(multerConfig.directory, filename);
    const fileExists = existsSync(filePath);

    if (fileExists) {
      await unlink(filePath);
    }
  }
}
