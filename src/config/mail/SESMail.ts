import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
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
      SES: new aws.SES({
        apiVersion: 'latest',
      }),
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
