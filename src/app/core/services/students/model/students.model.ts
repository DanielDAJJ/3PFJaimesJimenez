export interface Student{
    id: number;
    name: string;
    email: string;
    courses: string[];
    status: StudentStatus;
}

export enum StudentStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    GRADUATED = "graduated"
}

export const studentColumns: string[] = [
    'id',
    'name',
    'email',
    'courses',
    'status',
    'actions'
]