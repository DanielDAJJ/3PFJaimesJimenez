import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing-module';
import { Students } from './students';
import { SharedModuleModule } from '../../../shared/shared-module';
import { StudentsTable } from './students-table/students-table';
import { StudentsForm } from './students-form/students-form';
import { StudentsProfile } from './students-profile/students-profile';


@NgModule({
  declarations: [
    Students,
    StudentsTable,
    StudentsForm,
    StudentsProfile
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModuleModule
  ]
})
export class StudentsModule { }
