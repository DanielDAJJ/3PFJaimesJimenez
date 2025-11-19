import { Injectable } from '@angular/core';
import { Student } from './model/students.model';
import { MOCK_STUDENTS } from './data/students.mock';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private students: Student[] = MOCK_STUDENTS;
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable();
  constructor() {
    this.studentsSubject.next(this.students);
  }
  getStudents(){
    this.studentsSubject.next(this.students);
  }
  getStudentById(studentId: number) {
    return this.students$.pipe(
      map((students) => students.find((s) => s.id == studentId))
    );
  }
  addStudent(student: Student) {
    const newId = this.students.length > 0 ? this.students[this.students.length - 1].id + 1 : 1;
    student.id = newId;
    this.students.push(student);
    this.studentsSubject.next(this.students);
  }
  updateStudent(student: Student) {
    const updatedStudent = this.students.map((s) => (s.id === student.id ? student : s));
    this.students = updatedStudent;
    this.studentsSubject.next(this.students);
  }
  deleteStudent(studentId: number) {
    const filterredStudents = this.students.filter((s)=> (s.id !== studentId));
    this.students = filterredStudents;
    this.studentsSubject.next(this.students);
  }
}
