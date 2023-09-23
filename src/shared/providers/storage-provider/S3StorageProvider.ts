import { resolve } from 'node:path';
import { readFile, unlink } from 'node:fs/promises';
import { S3 } from '@aws-sdk/client-s3';
import { getType } from 'mime';
import { multerConfig } from '@config/fileUpload';

export class S3StorageProvider {
  private client: S3 = new S3({
    region: process.env.AWS_REGION,
    apiVersion: 'latest',
    endpoint: process.env.AWS_S3_BUCKET_ENDPOINT,
  });

  public async saveFile(filename: string): Promise<string> {
    const tempPath = resolve(multerConfig.tempFolder, filename);
    const fileType = getType(tempPath);

    if (!fileType) {
      throw new Error('File not found');
    }

    const fileContent = await readFile(tempPath);
    await this.client.putObject({
      Bucket: multerConfig.s3.aws.bucket,
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: fileType,
    });

    await unlink(tempPath);

    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: multerConfig.s3.aws.bucket,
      Key: filename,
    });
  }
}
