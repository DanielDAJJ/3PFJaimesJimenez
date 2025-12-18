import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { studentColumns, Student } from '../../../../core/services/students/model/students.model';
import { Course } from '../../../../core/services/courses/model/Course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentsService } from '../../../../core/services/students/students';
import { CoursesService } from '../../../../core/services/courses/courses';
import { InscriptionService } from '../../../../core/services/inscription/inscription';
import { Inscription } from '../../../../core/services/inscription/model/inscriptionInterface';
import { forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-students-table',
  standalone: false,
  templateUrl: './students-table.html',
  styleUrl: './students-table.css',
})
export class StudentsTable implements OnInit, AfterViewInit {
  displayedColumns: string[] = studentColumns;
  dataSource = new MatTableDataSource<Student>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  courses: Course[] = [];
  inscriptions: Inscription[] = [];

  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private inscriptionService: InscriptionService
  ){}

  ngOnInit(){
    this.loadAllData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onDeleteStudent(id: number){
    if (confirm('¿Estás seguro de querer eliminar a este estudiante?')) {
      this.studentsService.deleteStudent(id).subscribe(() => this.loadAllData());
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAllData(): void {
    forkJoin({
      students: this.studentsService.getStudents().pipe(take(1)),
      courses: this.coursesService.getCourses().pipe(take(1)),
      inscriptions: this.inscriptionService.getInscriptions().pipe(take(1))
    }).subscribe(data => {
      this.courses = data.courses;
      this.inscriptions = data.inscriptions;
      this.dataSource.data = data.students;
    });
  }

  getCourseTitles(studentId: number): string {
    if (!this.inscriptions.length || !this.courses.length) {
      return 'Cargando...';
    }

    const studentInscriptions = this.inscriptions.filter(i => Number(i.studentId) === studentId);
    if (!studentInscriptions.length) {
      return 'No inscrito';
    }

    const courseIds = studentInscriptions.map(i => i.courseId);
    const enrolledCourses = this.courses.filter(c => courseIds.includes(Number(c.id)));
    return enrolledCourses.map(c => c.title).join(', ') || 'No inscrito';
  }
}
