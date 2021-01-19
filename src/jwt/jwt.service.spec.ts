import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from './jwt.service';
import { CONFIG_OPTIONS } from 'src/common/constants/config.constants';
import * as jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => {
      return 'TOKEN';
    }),
    verify: jest.fn(() => {
      return {
        id: USER_ID,
      };
    }),
  };
});

const TEST_KEY = 'test.privatekey';
const USER_ID = 1;

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: CONFIG_OPTIONS,
          useValue: {
            privateKey: TEST_KEY,
          },
        },
      ],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  describe('sign', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return sign token', async () => {
      const ID = 1;
      const result = service.sign(ID);
      expect(result).toBe('TOKEN');
      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenCalledWith({ id: ID }, TEST_KEY);
    });
  });

  describe('verify', () => {
    it('should return decoded ', () => {
      const token = 'TOKEN';
      const decodedToken = service.verify(token);

      expect(decodedToken).toEqual({ id: USER_ID });
      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify).toHaveBeenCalledWith(token, TEST_KEY);
    });
  });
});
