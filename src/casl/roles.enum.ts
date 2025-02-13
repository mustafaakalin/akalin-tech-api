export enum RolesGlobal {
    ADMIN = 'admin',
    REGULAR_USER = 'regularuser',
    REGISTERED_USER = 'registereduser'
}

// Type guard to check if a value is a valid role
export const isValidRole = (role: any): role is RolesGlobal => {
    return Object.values(RolesGlobal).includes(role as RolesGlobal);
};

// Get all available roles as an array
export const getAllRoles = (): RolesGlobal[] => {
    return Object.values(RolesGlobal);
};

// Type for arrays of roles
export type RolesArray = RolesGlobal[];