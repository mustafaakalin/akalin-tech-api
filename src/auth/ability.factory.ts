import { AbilityBuilder, Ability } from '@casl/ability';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AbilityFactory {
  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder(Ability);
    
    if (user.role === 'admin') {
      can('manage', 'all');  // Admin herşeyi yönetebilir
    } else {
      can('read', 'User');  // Kullanıcı sadece kendi bilgilerini okuyabilir
      cannot('delete', 'User');  // Kullanıcı kendi bilgilerini silemez
    }

    return build();
  }
}
