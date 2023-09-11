import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailAlreadyExists = !!(await userRepository.findByEmail(email));

    if (emailAlreadyExists) {
      throw new AppError(`Email "${email}" already in use`);
    }

    const newUser = userRepository.create({ name, email, password });
    await userRepository.save(newUser);

    return newUser;
  }
}
