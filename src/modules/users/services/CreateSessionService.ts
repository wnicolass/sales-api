import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { compare } from 'bcrypt';

interface IUserRequest {
  email: string;
  password: string;
}

export class CreateSessionService {
  public async execute({ email, password }: IUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Wrong email/password combination', 401);
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new AppError('Wrong email/password combination', 401);
    }

    return user;
  }
}
