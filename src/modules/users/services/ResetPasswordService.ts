import { isAfter, addHours } from 'date-fns';
import { update } from '@shared/infra/typeorm/helpers/update';
import { AppError } from '@shared/errors/AppError';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { IUserTokenRepository } from '../domain/interfaces/IUserTokenRepository';
import { IResetPasswordRequest } from '../domain/interfaces/IResetPasswordRequest';

@injectable()
export class ResetPasswordService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({
    token,
    password,
  }: IResetPasswordRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token not found', 404);
    }

    const { created_at: iat } = userToken;
    const dateToCompare = addHours(iat, 2);

    if (isAfter(Date.now(), dateToCompare)) {
      throw new AppError('Expired token');
    }

    const user = await this.userRepository.findById(userToken.user_id);
    update(user, { password });
    await this.userRepository.save(user!);
  }
}
