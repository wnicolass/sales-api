import { Repository } from 'typeorm';
import { UserToken } from '../entities/UserToken';
import { dataSource } from '@shared/infra/typeorm';
import { IUserTokenRepository } from '@modules/users/domain/interfaces/IUserTokenRepository';

export class UserTokenRepository implements IUserTokenRepository {
  constructor(
    private ormRepo: Repository<UserToken> = dataSource.getRepository(
      UserToken,
    ),
  ) {}

  public async findByToken(token: string): Promise<UserToken | null> {
    return await this.ormRepo.findOneBy({ token });
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = this.ormRepo.create({ user_id: userId });
    return await this.ormRepo.save(userToken);
  }
}
