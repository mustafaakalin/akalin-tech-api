import { BasePolicyHandler } from './base.policy-handler';
import { Action } from '../../actions.enum';
import { Subjects } from '../../subjects.enum';

export class ReadPolicyHandler extends BasePolicyHandler {
  constructor(subject: Subjects, conditions: Record<string, any> | string = {}) {
    const parsedConditions = typeof conditions === 'string' 
    ? JSON.parse(conditions || '{}') 
    : conditions;
    super(Action.Read, subject, parsedConditions);
    // for string typeof conditions === 'string' ? JSON.parse(conditions || '{}') : conditions 
  }
}