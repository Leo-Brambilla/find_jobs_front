import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { CreateJobComponent } from './pages/create-job/create-job.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]

  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'create-job',
    component: CreateJobComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-job/:id',
    component: CreateJobComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent

  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
