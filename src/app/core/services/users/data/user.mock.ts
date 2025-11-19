import { userRole, User } from "../model/user.model";

export const userMock: User[] = [
    {
        id: 1,
        email: 'alice.johnson@example.com',
        role: userRole.ADMIN,
        password: 'password123'
    },
    {
        id: 2,
        email: 'bob.smith@example.com',
        role: userRole.USER,
        password: 'password456'
    },
]
