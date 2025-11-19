import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { SharedModuleModule } from '../../shared/shared-module';
import { Dashboard } from './dashboard';
import { Home } from './home/home';
import { MatDateRangePicker } from '@angular/material/datepicker';




@NgModule({
  declarations: [
    Dashboard,
    Home
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
