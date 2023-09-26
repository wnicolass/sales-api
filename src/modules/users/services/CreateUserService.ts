import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

interface IUserRequest {
  username: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({
    username,
    email,
    password,
  }: IUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailAlreadyExists = !!(await userRepository.findByEmail(email));

    if (emailAlreadyExists) {
      throw new AppError(`Email "${email}" already in use`);
    }

    const newUser = userRepository.create({ username, email, password });
    await userRepository.save(newUser);

    return newUser;
  }
}
