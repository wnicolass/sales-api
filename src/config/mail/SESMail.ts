import nodemailer from 'nodemailer';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SES, SendRawEmailCommand } from '@aws-sdk/client-ses';
import {
  HandlebarsMailTemplate,
  IParseMailTemplate,
} from './HandlebarsMailTemplate';
import { mailConfig } from './mail';

interface IMailContact {
  name: string;
  address: string;
}

interface IMessage {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export class SESMail {
  public static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: IMessage): Promise<void> {
    const transporter = nodemailer.createTransport({
      SES: {
        ses: new SES({
          apiVersion: 'latest',
          region: process.env.AWS_REGION,
          credentialDefaultProvider: defaultProvider,
        }),
        aws: { SendRawEmailCommand },
      },
    });

    const { email, name } = mailConfig.defaults.from;
    const mailTemplate = new HandlebarsMailTemplate();
    await transporter.sendMail({
      from: { address: from?.address || email, name: from?.name || name },
      to,
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}
