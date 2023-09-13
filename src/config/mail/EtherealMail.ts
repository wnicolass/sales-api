import nodemailer from 'nodemailer';
import {
  HandlebarsMailTemplate,
  IParseMailTemplate,
} from './HandlebarsMailTemplate';

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

export class EtherealMail {
  public static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: IMessage): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const mailTemplate = new HandlebarsMailTemplate();
    const message = await transporter.sendMail({
      from,
      to,
      subject,
      html: await mailTemplate.parse(templateData),
    });

    // This log is going to stay here for backend debugging reasons
    console.log(nodemailer.getTestMessageUrl(message));
  }
}
