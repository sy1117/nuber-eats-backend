import { MailService } from './mail.service';
import { Test } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/constants/config.constants';
import * as FormData from 'form-data';
import got from 'got';

jest.mock('got');

jest.mock('form-data');

const TEST_DOMAIN = 'test.domain';

describe('mailService', () => {
  let service: MailService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: CONFIG_OPTIONS,
          useValue: {
            apiKey: 'test.apikey',
            domain: TEST_DOMAIN,
            fromEmail: 'test.fromEmail',
          },
        },
      ],
    }).compile();
    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmailVerification', () => {
    it('should call email', () => {
      const sendEmailVerificationArgs = {
        email: 'test@email.com',
        code: 'test.code',
      };

      jest.spyOn(service, 'sendEmail').mockImplementation(async () => {
        return true;
      });

      service.sendVerificationEmail(
        sendEmailVerificationArgs.email,
        sendEmailVerificationArgs.code,
      );

      expect(service.sendEmail).toHaveBeenCalledTimes(1);
      expect(service.sendEmail).toHaveBeenCalledWith(
        sendEmailVerificationArgs.email,
        'number_',
        [
          {
            key: 'code',
            value: sendEmailVerificationArgs.code,
          },
          {
            key: 'username',
            value: sendEmailVerificationArgs.email,
          },
        ],
      );
    });
  });

  describe('sendEmail', () => {
    it('send email ', async () => {
      const result = await service.sendEmail('', '', []);

      const formSpy = jest.spyOn(FormData.prototype, 'append');
      expect(formSpy).toHaveBeenCalled();
      expect(got.post).toHaveBeenCalledTimes(1);
      expect(got.post).toHaveBeenCalledWith(
        `https://api.mailgun.net/v3/${TEST_DOMAIN}/messages`,
        expect.any(Object),
      );
      expect(result).toEqual(true);
    });

    it('fails on error', async () => {
      jest.spyOn(got, 'post').mockImplementation(() => {
        throw new Error();
      });
      const result = await service.sendEmail('', '', []);
      expect(result).toEqual(false);
    });
  });
});
