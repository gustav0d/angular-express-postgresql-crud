import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ListTasksComponent } from './features/tasks/list/listTasks.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'tasks',
    component: ListTasksComponent,
    canActivate: [AuthGuard],
  },
];
