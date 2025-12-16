import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../core/services/students/students';
import { Student } from '../../../../core/services/students/model/students.model';
import { forkJoin, map, Observable } from 'rxjs';
import { Course } from '../../../../core/services/courses/model/Course';
import { CoursesService } from '../../../../core/services/courses/courses';
import { InscriptionService } from '../../../../core/services/inscription/inscription';

@Component({
  selector: 'app-students-profile',
  standalone: false,
  templateUrl: './students-profile.html',
  styleUrl: './students-profile.css',
})
export class StudentsProfile implements OnInit {
  public student$: Observable<Student | undefined>;
  public enrolledCourses$!: Observable<Course[]>;
  private studentId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private inscriptionService: InscriptionService 
  ) {
    this.studentId = Number(this.activatedRoute.snapshot.params['id']);
    this.student$ = this.studentsService.getStudentById(this.studentId);
  }

  ngOnInit(): void {
    this.loadEnrolledCourses();
  }

  private loadEnrolledCourses(): void {
    this.enrolledCourses$ = forkJoin({
      inscriptions: this.inscriptionService.getInscriptions(),
      courses: this.coursesService.getCourses(),
    }).pipe(
      map((result) => {
        const studentInscriptions = result.inscriptions.filter(
          (i) => i.studentId === this.studentId
        );
        const courseIds = studentInscriptions.map((i) => i.courseId);
        return result.courses.filter((c) => courseIds.includes(c.id));
      })
    );
  }

  onUnenroll(courseId: number): void {
    if (confirm('¿Estás seguro de que quieres desinscribir a este alumno del curso?')) {
      this.inscriptionService.deleteInscriptionByCourseAndStudentId(courseId, this.studentId);
      this.loadEnrolledCourses();
    }
  }
}
