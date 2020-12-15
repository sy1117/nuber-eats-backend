import { Injectable, Global, Inject } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/constants/config.constants';
import { MailModuleOptions, EmailVar } from './mail.interfaces';
import got from 'got';
import * as FormData from 'form-data';

@Injectable()
@Global()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    this.sendEmail('test', 'number_', []);
  }

  private async sendEmail(
    subject: string,
    template: string,
    emailVar?: EmailVar[],
  ) {
    const form = new FormData();
    form.append('from', `Nuber Eats <mailgun@${this.options.fromEmail}>`);
    form.append('to', 'soyou6358@gmail.com');
    form.append('subject', subject);
    // form.append('text', content);
    form.append('template', template);
    // form.append('v:code', '12312');
    // form.append('v:username', 'soyoung');

    emailVar.map(({ key, value }) => {
      form.append(`v:${key}`, value);
    });

    try {
      const response = await got(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail(email, 'number_', [
      {
        key: 'code',
        value: code,
      },
      {
        key: 'username',
        value: email,
      },
    ]);
  }
}
