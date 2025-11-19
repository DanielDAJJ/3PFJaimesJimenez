import { Course, CourseStatus } from '../model/Course';

export const MOCK_COURSES: Course[] = [
    {
        id: 1,
        title: 'Math',
        description: 'Basic Mathematics',
        duration: 40,
        beginDate: new Date('2024-01-10'),
        endDate: new Date('2024-02-10'),
        status: CourseStatus.SCHEDULED
    },
    {
        id: 2,
        title: 'Science',
        description: 'Introduction to Science',
        duration: 50,
        beginDate: new Date('2024-03-01'),
        endDate: new Date('2024-04-01'),
        status: CourseStatus.STARTED
    },
    {
        id: 3,
        title: 'History',
        description: 'World History',
        duration: 60,
        beginDate: new Date('2024-05-15'),
        endDate: new Date('2024-06-15'),
        status: CourseStatus.CANCELED
    },
    {
        id: 4,
        title: 'English',
        description: 'Advanced English',
        duration: 45,
        beginDate: new Date('2024-07-20'),
        endDate: new Date('2024-08-20'),
        status: CourseStatus.COMPLETED
    }
];

