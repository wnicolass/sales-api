import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserToken';

interface IUserTokenRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IUserTokenRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await userTokenRepository.generate(user.user_id);
  }
}
