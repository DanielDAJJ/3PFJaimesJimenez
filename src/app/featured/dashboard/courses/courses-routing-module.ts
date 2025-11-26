import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Courses } from './courses';
import { CoursesTable } from './courses-table/courses-table';
import { CoursesForm } from './courses-form/courses-form';
import { adminGuard } from '../../../core/guards/admin/admin-guard';

const routes: Routes = [
  { path: '', component: Courses, children: [
    { path: '', component: CoursesTable},
    { path: 'edit/:id', component: CoursesForm, canActivate: [adminGuard]},
    { path: 'create', component: CoursesForm, canActivate: [adminGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
