export enum userRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface User {
    id: number;
    email: string;
    password?: string;
    role: userRole;
}
