import { Repository, getRepository } from 'typeorm';
import { UserToken } from '../entities/UserToken';
import { IUserTokenRepository } from '@modules/users/domain/interfaces/IUserTokenRepository';

export class UserTokenRepository implements IUserTokenRepository {
  constructor(
    private ormRepo: Repository<UserToken> = getRepository(UserToken),
  ) {}

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return await this.ormRepo.findOne({ where: { token } });
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = this.ormRepo.create({ user_id: userId });
    return await this.ormRepo.save(userToken);
  }
}
