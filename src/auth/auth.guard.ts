import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    try {
      const gqlContext = GqlExecutionContext.create(context).getContext();
      if (gqlContext['user']) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }
}
