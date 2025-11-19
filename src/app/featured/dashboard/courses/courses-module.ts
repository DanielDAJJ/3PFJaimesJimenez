import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing-module';
import { CoursesTable } from './courses-table/courses-table';
import { CoursesForm } from './courses-form/courses-form';
import { Courses } from './courses';
import { SharedModuleModule } from '../../../shared/shared-module';


@NgModule({
  declarations: [
    CoursesTable,
    CoursesForm,
    Courses
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModuleModule
  ]
})
export class CoursesModule { }
