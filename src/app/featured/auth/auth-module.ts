import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../../shared/shared-module';
import { Login } from './login/login';



@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule,
    SharedModuleModule
  ]
})
export class AuthModuleModule { }
