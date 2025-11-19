import { Component, ViewChild } from '@angular/core';
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
export class CoursesTable {
  displayedColumns: string[] = coursesColumns;
  dataSource = new MatTableDataSource<Course>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private CoursesService: CoursesService) {
    this.CoursesService.courses$.subscribe((courses)=>{
      this.dataSource.data = courses;
    });
  }
  ngOnInit(){
    this.CoursesService.getCourses();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onDeleteCourse(id: number) {
    this.CoursesService.deleteCourse(id);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
