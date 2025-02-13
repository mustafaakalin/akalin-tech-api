import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory';
import { AppAbility } from './casl-ability.factory';
import { PolicyHandler, PolicyHandlerCallback } from './interfaces/policy-handler.interface';
import { CHECK_POLICIES_KEY } from './decorators/check-policies.decorator';




@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}



  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandler[]>(
      CHECK_POLICIES_KEY,
      context.getHandler(),
    ) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) => {
      if (this.isFunction(handler)) {
        return (handler as PolicyHandlerCallback)(ability);
      }
      return handler.handle(ability);
    });
  }

  private isFunction(handler: PolicyHandler): handler is PolicyHandlerCallback {
    return typeof handler === 'function';
  }


}