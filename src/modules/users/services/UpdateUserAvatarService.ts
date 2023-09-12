import { getCustomRepository } from 'typeorm';
import { join } from 'node:path';
import { unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { User } from '../typeorm/entities/User';
import { update } from '@shared/typeorm/helpers/update';
import { AppError } from '@shared/errors/AppError';
import { multerConfig } from '@config/fileUpload';
import { UserRepository } from '../typeorm/repositories/UserRepository';

interface IUserRequest {
  userId: string;
  filename: string;
}

export class UpdateUserAvatarService {
  public async execute({ userId, filename }: IUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = join(multerConfig.directory, user.avatar);
      const avatarPathExists = existsSync(userAvatarFilePath);

      if (avatarPathExists) {
        await unlink(userAvatarFilePath);
      }
    }

    update(user, { avatar: filename });
    await userRepository.save(user);

    return user;
  }
}
