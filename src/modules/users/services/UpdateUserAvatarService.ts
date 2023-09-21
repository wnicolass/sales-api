import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { update } from '@shared/typeorm/helpers/update';
import { AppError } from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { DiskStorageProvider } from '@shared/providers/storage-provider/DiskStorageProvider';

interface IUserRequest {
  userId: string;
  filename: string;
}

export class UpdateUserAvatarService {
  public async execute({ userId, filename }: IUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(userId);
    const storageProvider = new DiskStorageProvider();

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
