import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { Action } from './actions.enum';
import { Subjects } from './subjects.enum';
import { RolesGlobal } from './roles.enum';
import { Ability } from '@casl/ability';

export type AppAbility = Ability;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (user.roles.includes(RolesGlobal.REGULAR_USER)) {
        // Regular user - limited to own user operations
        can(Action.ReadOwn, Subjects.User, { 
          id: user.id 
        }); // Can only read own profile
        
        can(Action.UpdateOwn, Subjects.User, { 
          id: user.id 
        }); // Can only update own profile
        
        // Explicitly deny other actions
        cannot(Action.Create, Subjects.User).because('Regular users cannot create new users');
        cannot(Action.Delete, Subjects.User).because('Regular users cannot delete accounts');
        cannot(Action.Manage, Subjects.All).because('Regular users cannot manage resources');
    }

    if (user.roles.includes(RolesGlobal.REGISTERED_USER)) {
      // Registered user permissions
      can(Action.Read, Subjects.User, { id: user.id });
      can(Action.Update, Subjects.User, { id: user.id });
      can(Action.Read, Subjects.Profile);
    }

    if (user.roles.includes(RolesGlobal.ADMIN)) {
        // Admin permissions - full access
        can(Action.Manage, Subjects.All); // SuperAdmin permission
        can(Action.Create, Subjects.User); // Can create users
        can(Action.Read, Subjects.User); // Can read all users
        can(Action.Update, Subjects.User); // Can update all users
        can(Action.Delete, Subjects.User); // Can delete users
      // Admin permissions
    }

    return build();
  }

  // Helper method to check if user is operating on their own resource
  private isOwner(userId: string, resourceId: string): boolean {
    return userId === resourceId;
  }
}