import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Students } from './students';
import { StudentsTable } from './students-table/students-table';
import { StudentsForm } from './students-form/students-form';
import { StudentsProfile } from './students-profile/students-profile';

const routes: Routes = [
  { path: '', component: Students, children: [
    { path: '', component: StudentsTable},
    { path: 'create', component: StudentsForm},
    { path: 'edit/:id', component: StudentsForm},
    { path: 'profile/:id', component: StudentsProfile}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
