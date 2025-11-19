export interface Course {
    id: number;
    title: string;
    description: string;
    duration: number;
    beginDate: Date;
    endDate: Date;
    status: CourseStatus;
}

export enum CourseStatus {
    STARTED = 'Started',
    SCHEDULED = 'Scheduled',
    COMPLETED = 'Completed',
    CANCELED = 'Canceled'
}

export const coursesColumns: string[] = ['id', 'title', 'description', 'duration', 'beginDate', 'endDate', 'status', 'actions'];