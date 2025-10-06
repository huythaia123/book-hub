import { User } from '@/types';

export function userHasAnyRole(user: User, rolesToCheck: string[]) {
    if (!user?.roles) return false;
    return user.roles.some((role) => rolesToCheck.includes(role.name));
}
