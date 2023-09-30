import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IJWTAdapter } from '../domain/interfaces/IJWTAdapter';
import { tokenConfig } from '@config/token';
import { IBcryptAdapter } from '../domain/interfaces/IBcryptAdapter';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { ISessionResponse } from '../domain/interfaces/ISessionResponse';
import { ICreateSessionRequest } from '../domain/interfaces/ICreateSessionRequest';

@injectable()
export class CreateSessionService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('JWTAdapter') private jwt: IJWTAdapter,
    @inject('BcryptAdapter') private bcrypt: IBcryptAdapter,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessionRequest): Promise<ISessionResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Wrong email/password combination', 401);
    }

    const passwordsMatch = await this.bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new AppError('Wrong email/password combination', 401);
    }

    const token = this.jwt.encode({}, tokenConfig.secret, {
      subject: user.user_id,
      expiresIn: tokenConfig.exp,
    });

    return { user, token };
  }
}
