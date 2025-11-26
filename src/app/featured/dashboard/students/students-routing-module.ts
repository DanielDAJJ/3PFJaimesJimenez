import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Students } from './students';
import { StudentsTable } from './students-table/students-table';
import { StudentsForm } from './students-form/students-form';
import { StudentsProfile } from './students-profile/students-profile';
import { adminGuard } from '../../../core/guards/admin/admin-guard';

const routes: Routes = [
  { path: '', component: Students, children: [
    { path: '', component: StudentsTable},
    { path: 'profile/:id', component: StudentsProfile},
    { path: 'create', component: StudentsForm , canActivate: [adminGuard]},
    { path: 'edit/:id', component: StudentsForm, canActivate: [adminGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
