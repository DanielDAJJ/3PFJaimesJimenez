import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Course, coursesColumns } from '../../../../core/services/courses/model/Course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CoursesService } from '../../../../core/services/courses/courses';


@Component({
  selector: 'app-courses-table',
  standalone: false,
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.css',
})
export class CoursesTable implements OnInit, AfterViewInit {
  displayedColumns: string[] = coursesColumns;
  dataSource = new MatTableDataSource<Course>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(){
    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.dataSource.data = courses;
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onDeleteCourse(id: number) {
    this.coursesService.deleteCourse(id).subscribe(() => this.loadCourses());
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
