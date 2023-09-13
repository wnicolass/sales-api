import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcrypt';
import { update } from '@shared/typeorm/helpers/update';

interface IProfileRequest {
  userId: string;
  username: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

export class UpdateProfileService {
  public async execute({
    userId,
    username,
    email,
    password,
    oldPassword,
  }: IProfileRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const userByNewEmail = await userRepository.findByEmail(email);
    const currentUserEmail = userByNewEmail?.email === user.email;
    if (userByNewEmail && !currentUserEmail) {
      throw new AppError('Email is already in use');
    }

    if (password && !oldPassword) {
      throw new AppError('Old password must be provided');
    }

    if (password && oldPassword) {
      const validOldPassword = await compare(oldPassword, user.password);

      if (!validOldPassword) {
        throw new AppError('Old password does not match');
      }
    }
    update(user, { password, username, email });
    await userRepository.save(user);

    return user;
  }
}
