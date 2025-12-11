import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../../core/services/courses/courses';
import { formGroup } from './validators';

@Component({
  selector: 'app-courses-form',
  standalone: false,
  templateUrl: './courses-form.html',
  styleUrl: './courses-form.css',
})
export class CoursesForm {
  createForm: FormGroup;
  courseId: number | null = null;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private CoursesService: CoursesService,
    private router: Router
  ){
    this.createForm = this.fb.group(formGroup);
    this.route.params.subscribe((params)=>{
      if(params['id']){
        this.courseId = Number(params['id']);
        this.isEditing = true;
        this.CoursesService.getCourseById(this.courseId).subscribe((course)=>{
          if(course) this.createForm.patchValue(course);
        })
      }
    })
  }
  onSubmit(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    if (this.isEditing && this.courseId) {
      this.CoursesService.updateCourse(this.courseId, this.createForm.value).subscribe({
        next: () => this.router.navigate(['/dashboard/courses']),
      });
    } else {
      this.CoursesService.addCourse(this.createForm.value).subscribe({
        next: () => this.router.navigate(['/dashboard/courses']),
      });
    }
  }
  inputValid(inputName: 'title' | 'description' | 'duration' | 'beginDate' | 'endDate' | 'status'){
    return this.createForm.get(inputName)?.valid && this.createForm.get(inputName)?.touched;
  }
  inputInvalid(inputName: 'title' | 'description' | 'duration' | 'beginDate' | 'endDate' | 'status'){
    return(
      this.createForm.get(inputName)?.invalid && this.createForm.get(inputName)?.touched && this.createForm.get(inputName)?.dirty
    );
  }
  getError(inputName: 'title' | 'description' | 'duration' | 'beginDate' | 'endDate' | 'status'){
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
        default:
          break;
      }
    })
    return message;
  }
}
