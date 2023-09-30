import { resolve } from 'node:path';
import { inject, injectable } from 'tsyringe';
import { SESMail } from '@config/mail/SESMail';
import { AppError } from '@shared/errors/AppError';
import { mailConfig } from '@config/mail/mail';
import { EtherealMail } from '@config/mail/EtherealMail';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { IUserTokenRepository } from '../domain/interfaces/IUserTokenRepository';
import { IForgotPasswordRequest } from '../domain/interfaces/IForgotPasswordEmail';

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IForgotPasswordRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { token } = await this.userTokenRepository.generate(user.user_id);

    const forgotPasswordTemplate = resolve(
      __dirname,
      '..',
      'views',
      'forgot-password.hbs',
    );

    await (mailConfig.driver === 'ses' ? SESMail : EtherealMail).sendMail({
      to: {
        name: user.username,
        address: user.email,
      },
      subject: '[Sales API] Reset your password',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.username,
          link: `${process.env.APP_URL}:${process.env.PORT}/reset_password?token=${token}`,
        },
      },
    });
  }
}
