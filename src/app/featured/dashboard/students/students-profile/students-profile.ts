import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../core/services/students/students';
import { Student } from '../../../../core/services/students/model/students.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-students-profile',
  standalone: false,
  templateUrl: './students-profile.html',
  styleUrl: './students-profile.css',
})
export class StudentsProfile {
  
  public student$: Observable<Student | undefined>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService
  ) {
    const studentId = this.activatedRoute.snapshot.params['id'];
    this.student$ = this.studentsService.getStudentById(studentId);
  }
}
