import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { studentColumns, Student } from '../../../../core/services/students/model/students.model';
import { Course } from '../../../../core/services/courses/model/Course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentsService } from '../../../../core/services/students/students';
import { CoursesService } from '../../../../core/services/courses/courses';

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

  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ){}

  ngOnInit(){
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.dataSource.data = students;
      },
    });

    this.coursesService.getCourses().subscribe({
      next: (allCourses) => {
        this.courses = allCourses;
      },
    });
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  onDeleteStudent(id: number){
    this.studentsService.deleteStudent(id);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCourseTitles(courseIds: number[]): string {
    if (!courseIds || !this.courses.length) {
      return 'Sin cursos';
    }
    return courseIds
      .map(id => this.courses.find(c => c.id == id)?.title)
      .filter(title => title).join(', ');
  }
}
