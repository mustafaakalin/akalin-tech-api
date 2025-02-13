import { AppAbility } from '../../casl-ability.factory';
import { IPolicyHandler } from '../../interfaces/policy-handler.interface';
import { Action } from '../../actions.enum';
import { Subjects } from '../../subjects.enum';

export class BasePolicyHandler implements IPolicyHandler {
  constructor(
    private readonly action: Action,
    private readonly subject: Subjects,
    private readonly conditions: Record<string, any> | string = {},
  ) {}

  handle(ability: AppAbility): boolean {
    const parsedConditions = typeof this.conditions === 'string' 
    ? JSON.parse(this.conditions || '{}') 
    : this.conditions;

    return ability.can(this.action, this.subject, parsedConditions);
    // typeof this.conditions === 'string' ? JSON.parse(this.conditions || '{}') : this.conditions
  }
}