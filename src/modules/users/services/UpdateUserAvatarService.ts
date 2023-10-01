import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/interfaces/IUser';
import { update } from '@shared/infra/typeorm/helpers/update';
import { AppError } from '@shared/errors/AppError';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { S3StorageProvider } from '@shared/providers/storage-provider/S3StorageProvider';
import { DiskStorageProvider } from '@shared/providers/storage-provider/DiskStorageProvider';
import { IUpdateUserAvatarRequest } from '../domain/interfaces/IUpdateUserAvatarRequest';

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute({
    userId,
    filename,
  }: IUpdateUserAvatarRequest): Promise<IUser> {
    const user = await this.userRepository.findById(userId);
    const StorageDriver =
      process.env.STORAGE_DRIVER === 's3'
        ? S3StorageProvider
        : DiskStorageProvider;
    const storageProvider = new StorageDriver();

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar);
    }

    const avatarFilename = await storageProvider.saveFile(filename);
    update(user, { avatar: avatarFilename });
    await this.userRepository.save(user);

    return user;
  }
}
