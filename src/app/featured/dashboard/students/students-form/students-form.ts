import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../../../core/services/students/students';
import { formGroup } from './validators.student';
import { CoursesService } from '../../../../core/services/courses/courses';
import { Course } from '../../../../core/services/courses/model/Course';


@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.html',
  styleUrl: './students-form.css',
})
export class StudentsForm {
  createForm: FormGroup;
  studentId: number | null = null;
  isEditing: boolean = false;
  coursesList: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private StudentsService: StudentsService,
    private CoursesService: CoursesService,
    private router: Router
  ){
    this.createForm = this.fb.group(formGroup);
    this.route.params.subscribe((params)=>{
      if(params['id']){
        this.studentId = Number(params['id']);
        this.isEditing = true;
        this.StudentsService.getStudentById(this.studentId).subscribe((student)=>{
          if(student) this.createForm.patchValue(student);
        })
      }
    })
  }
  onSubmit(): void {
    if(this.isEditing){
      this.StudentsService.updateStudent(this.createForm.value);
    } else {
      this.StudentsService.addStudent(this.createForm.value);
    }
    this.createForm.reset();
    this.router.navigate(['/dashboard/students']);
  }
  inputValid(inputName: 'name' | 'email' | 'courses' | 'status'){
    return this.createForm.get(inputName)?.valid && this.createForm.get(inputName)?.touched;
  }
  inputInvalid(inputName: 'name' | 'email' | 'courses' | 'status'){
    return(
      this.createForm.get(inputName)?.invalid && this.createForm.get(inputName)?.touched && this.createForm.get(inputName)?.dirty
    )
  }
  getError(inputName: 'name' | 'email' | 'courses' | 'status'){
    if(!this.createForm.get(inputName)?.errors){
      return null;
    }
    const errors = Object.keys(this.createForm.get(inputName)?.errors as string[]);
    if(errors.length === 0){
      return null;
    }
    let message = '';
    errors.forEach((error)=>{
      switch(error){
        case 'required':
          message += 'This field is required. ';
          break;
        case 'minlength':
          message += 'Minimum length not met. ';
          break;
        case 'email':
          message += 'Invalid email format. ';
          break;
        default:
          break;
      }
    })
    return message;
  }
  ngOnInit(){
    this.loadCourses();
  }
  loadCourses(): void {
    this.CoursesService.courses$.subscribe({
      next: (courses) =>{
        this.coursesList = courses;
      }
    });
    this.CoursesService.getCourses();
  }
}
