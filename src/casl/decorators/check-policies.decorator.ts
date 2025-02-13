import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from '../interfaces/policy-handler.interface';
import { Subjects } from '../subjects.enum';
import { Action } from '../actions.enum';


export interface PolicyRequirement {
    action: Action;
    subject: Subjects;
    conditions?: Record<string, any>;
  }

export const CHECK_POLICIES_KEY = 'check_policy';
// export const CheckPolicies = (...handlers: PolicyHandler[]) =>
//   SetMetadata(CHECK_POLICIES_KEY, handlers);
export const CheckPolicies = (...requirements: PolicyRequirement[]) =>
  SetMetadata(CHECK_POLICIES_KEY, requirements);




// import { SetMetadata } from '@nestjs/common';
// import { PolicyHandler } from '../../interfaces/policy-handler.interface';
// import { Action } from '../../actions.enum';
// import { Subjects } from '../../subjects.enum';


// export interface PolicyRequirement {
//     action: Action;
//     subject: Subjects;
//     conditions?: Record<string, any>;
//   }

// export const CHECK_POLICIES_KEY = 'check_policy';
// export const CheckPolicies = (...requirements: PolicyRequirement[]) =>
//   SetMetadata(CHECK_POLICIES_KEY, requirements);