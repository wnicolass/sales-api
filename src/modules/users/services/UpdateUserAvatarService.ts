import { getCustomRepository } from 'typeorm';
import { User } from '../infra/typeorm/entities/User';
import { update } from '@shared/infra/typeorm/helpers/update';
import { AppError } from '@shared/errors/AppError';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { DiskStorageProvider } from '@shared/providers/storage-provider/DiskStorageProvider';
import { S3StorageProvider } from '@shared/providers/storage-provider/S3StorageProvider';

interface IUserRequest {
  userId: string;
  filename: string;
}

export class UpdateUserAvatarService {
  public async execute({ userId, filename }: IUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(userId);
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
    await userRepository.save(user);

    return user;
  }
}
