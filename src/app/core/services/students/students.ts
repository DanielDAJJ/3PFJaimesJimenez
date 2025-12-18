import { Injectable } from '@angular/core';
import { Student } from './model/students.model';
import { MOCK_STUDENTS } from './data/students.mock';
import { BehaviorSubject, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private students$ = new BehaviorSubject<Student[]>([]);

  constructor() {
    this.students$.next(MOCK_STUDENTS);
  }

  getStudents(): Observable<Student[]> {
    return this.students$.asObservable();
  }

  getStudentById(studentId: number): Observable<Student | undefined> {
    return this.students$.pipe(
      map((students) => students.find((s) => s.id == studentId))
    );
  }

  addStudent(student: Omit<Student, 'id'>): void {
    const students = this.students$.getValue();
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent: Student = { ...student, id: newId };
    this.students$.next([...students, newStudent]);
  }

  updateStudent(updatedStudent: Student): void {
    const students = this.students$.getValue();
    const updatedStudents = students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s));
    this.students$.next(updatedStudents);
  }

  deleteStudent(studentId: number): Observable<any> {
    const students = this.students$.getValue();
    const filteredStudents = students.filter((s) => s.id !== studentId);
    this.students$.next(filteredStudents);
    return of(null);
  }
}
