import { Module, DynamicModule, Global } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';

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
