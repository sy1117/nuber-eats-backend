import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './role.decorator';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {
  }
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler());
    // without @Role => public
    if (!roles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContext['user'];
    if (user) {
      // without @Role(["Any"]) => all logged in user 
      if (roles.includes('Any')) return true;
      // @Role["Client", "Delivery", ...]
      return roles.includes(user.role)
    }
    return false;
  }
}
