import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/interfaces/IUser';
import { AppError } from '@shared/errors/AppError';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { ICreateUserRequest } from '../domain/interfaces/ICreateUserRequest';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute({
    username,
    email,
    password,
  }: ICreateUserRequest): Promise<IUser> {
    const emailAlreadyExists = !!(await this.userRepository.findByEmail(email));

    if (emailAlreadyExists) {
      throw new AppError(`Email "${email}" already in use`);
    }

    const newUser = await this.userRepository.create({
      username,
      email,
      password,
    });
    await this.userRepository.save(newUser);

    return newUser;
  }
}
