import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/interfaces/IUser';
import { IPagination } from '@shared/interfaces/IPagination';
import { IUserRepository } from '../domain/interfaces/IUserRepository';

interface ISearchParams {
  page: number;
  limit: number;
}

@injectable()
export class ListUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: ISearchParams): Promise<IPagination<IUser>> {
    return await this.userRepository.findAll({
      take: limit,
      skip: (+page - 1) * limit,
      page,
    });
  }
}
