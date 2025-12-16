import { Inscription } from '../model/inscriptionInterface';

export const MOCK_INSCRIPTIONS: Inscription[] = [
    {
        id: 1,
        studentId: 1, 
        courseId: 1,  
        inscriptionDate: new Date('2024-01-15'),
        userId: 1 
    },
    {
        id: 2,
        studentId: 1, 
        courseId: 2,  
        inscriptionDate: new Date('2024-02-01'),
        userId: 1
    },
    {
        id: 3,
        studentId: 2, 
        courseId: 3,
        inscriptionDate: new Date('2024-03-10'),
        userId: 1
    }
];
