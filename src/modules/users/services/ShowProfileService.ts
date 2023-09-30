import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/interfaces/IUser';
import { AppError } from '@shared/errors/AppError';
import { IProfileRequest } from '../domain/interfaces/IProfileRequest';
import { IUserRepository } from '../domain/interfaces/IUserRepository';

@injectable()
export class ShowProfileService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute({ userId }: IProfileRequest): Promise<IUser> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
