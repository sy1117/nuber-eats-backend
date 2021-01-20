import { Injectable, Global, Inject } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interfaces';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from 'src/common/constants/config.constants';

@Injectable()
@Global()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) { }

  sign(userId: number): string {
  }

  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
