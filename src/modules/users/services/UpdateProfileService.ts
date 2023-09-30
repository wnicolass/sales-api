import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/interfaces/IUser';
import { update } from '@shared/infra/typeorm/helpers/update';
import { AppError } from '@shared/errors/AppError';
import { IBcryptAdapter } from '../domain/interfaces/IBcryptAdapter';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { IUpdateProfileRequest } from '../domain/interfaces/IUpdateProfileRequest';

@injectable()
export class UpdateProfileService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('BcryptAdapter') private bcrypt: IBcryptAdapter,
  ) {}

  public async execute({
    userId,
    username,
    email,
    password,
    oldPassword,
  }: IUpdateProfileRequest): Promise<IUser> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const userByNewEmail = await this.userRepository.findByEmail(email);
    const currentUserEmail = userByNewEmail?.email === user.email;
    if (userByNewEmail && !currentUserEmail) {
      throw new AppError('Email is already in use');
    }

    if (password && !oldPassword) {
      throw new AppError('Old password must be provided');
    }

    if (password && oldPassword) {
      const validOldPassword = await this.bcrypt.compare(
        oldPassword,
        user.password,
      );

      if (!validOldPassword) {
        throw new AppError('Old password does not match');
      }
    }
    update(user, { password, username, email });
    await this.userRepository.save(user);

    return user;
  }
}
