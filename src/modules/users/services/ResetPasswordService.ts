import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { AppError } from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserToken';
import { update } from '@shared/typeorm/helpers/update';

interface IUserTokenRequest {
  token: string;
  password: string;
}

export class ResetPasswordService {
  public async execute({ token, password }: IUserTokenRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token not found', 404);
    }

    const { created_at: iat } = userToken;
    const dateToCompare = addHours(iat, 2);

    if (isAfter(Date.now(), dateToCompare)) {
      throw new AppError('Expired token');
    }

    const user = await userRepository.findById(userToken.user_id);
    update(user, { password });
    await userRepository.save(user!);
  }
}
