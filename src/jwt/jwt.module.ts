import { Module, DynamicModule, Global } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModuleOptions } from './jwt.interfaces';
import { CONFIG_OPTIONS } from 'src/common/constants/config.constants';

@Module({
  providers: [JwtService],
})
@Global()
export class JwtModule {
  static forRoot(jwtModuleOptions: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: jwtModuleOptions,
        },
        JwtService,
      ],
    };
  }
}
