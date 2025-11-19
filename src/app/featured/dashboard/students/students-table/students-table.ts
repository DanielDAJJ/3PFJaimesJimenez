import { Component, ViewChild } from '@angular/core';
import { studentColumns, Student } from '../../../../core/services/students/model/students.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentsService } from '../../../../core/services/students/students';

@Component({
  selector: 'app-students-table',
  standalone: false,
  templateUrl: './students-table.html',
  styleUrl: './students-table.css',
})
export class StudentsTable {
  displayedColumns: string[] = studentColumns;
  dataSource = new MatTableDataSource<Student>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private StudentsService: StudentsService){
    this.StudentsService.students$.subscribe((students)=>{
      this.dataSource.data = students;
    });
  }
  ngOnInit(){
    this.StudentsService.getStudents();
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  onDeleteStudent(id: number){
    this.StudentsService.deleteStudent(id);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
