import { StudentStatus, Student } from '../model/students.model';

export const MOCK_STUDENTS: Student[] = [
    {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        courses: ['Math', 'Science'],
        status: StudentStatus.ACTIVE
    },
    {
        id: 2,
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        courses: ['History', 'English'],
        status: StudentStatus.INACTIVE
    },
    {
        id: 3,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        courses: ['English', 'Math'],
        status: StudentStatus.GRADUATED
    },
    {
        id: 4,
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        courses: ['Science', 'History'],
        status: StudentStatus.ACTIVE
    }
]