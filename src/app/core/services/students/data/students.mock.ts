import { StudentStatus, Student } from '../model/students.model';

export const MOCK_STUDENTS: Student[] = [
    {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        courses: [1, 2],
        status: StudentStatus.ACTIVE
    },
    {
        id: 2,
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        courses: [3, 4],
        status: StudentStatus.INACTIVE
    },
    {
        id: 3,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        courses: [4, 1],
        status: StudentStatus.GRADUATED
    },
    {
        id: 4,
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        courses: [2, 3],
        status: StudentStatus.ACTIVE
    }
]