import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';
import { tokenConfig } from '@config/token';
import { UserRepository } from '../typeorm/repositories/UserRepository';

interface IUserRequest {
  email: string;
  password: string;
}

interface ISessionResponse {
  user: User;
  token: string;
}

export class CreateSessionService {
  public async execute({
    email,
    password,
  }: IUserRequest): Promise<ISessionResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Wrong email/password combination', 401);
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new AppError('Wrong email/password combination', 401);
    }

    const token = sign({}, tokenConfig.secret, {
      subject: user.user_id,
      expiresIn: tokenConfig.exp,
    });

    return { user, token };
  }
}
