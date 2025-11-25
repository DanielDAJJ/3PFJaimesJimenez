import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './featured/auth/login/login';
import { Dashboard } from './featured/dashboard/dashboard';
import { authGuard } from './core/guards/auth/auth-guard';


const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard,loadChildren: () => import('./featured/dashboard/dashboard-module').then(m => m.DashboardModule), canActivate: [authGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }