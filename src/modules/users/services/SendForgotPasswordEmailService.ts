import { resolve } from 'node:path';
import { getCustomRepository } from 'typeorm';
import { SESMail } from '@config/mail/SESMail';
import { AppError } from '@shared/errors/AppError';
import { mailConfig } from '@config/mail/mail';
import { EtherealMail } from '@config/mail/EtherealMail';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserToken';

interface IUserTokenRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IUserTokenRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { token } = await userTokenRepository.generate(user.user_id);

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
