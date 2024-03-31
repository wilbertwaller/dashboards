import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', 
    component: HomeComponent,
    title: 'Dashboards',
    data: { 'title': 'Dashboards' }
  },
  {
    path: 'dashboard-manager', 
    pathMatch: 'full',
    component: DashboardManagerComponent,
    title: 'Dashboard Manager',
    data: { group: 'Admin' }
  },
  {
    path: 'user-manager', 
    pathMatch: 'full',
    component: UserManagerComponent,
    title: 'User Manager',
    data: { group: 'Admin' }
  }
];
