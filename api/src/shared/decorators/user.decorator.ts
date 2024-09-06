import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/domain/user/entity/user';

export const CurrentUser = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
