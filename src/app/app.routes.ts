import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardManagerComponent } from './dashboards/dashboard-manager/dashboard-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { ArchivesComponent } from './archives/archives.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', 
    component: HomeComponent,
    title: 'Dashboards'
  },
  {
    path: 'archives', 
    pathMatch: 'full',
    component: ArchivesComponent,
    title: 'Archives',
    data: { group: 'Admin' }
  },
  {
    path: 'dashboard-manager', 
    pathMatch: 'full',
    component: DashboardManagerComponent,
    title: 'Dashboard Manager',
    data: { group: 'Admin' }
  },
  {
    path: 'dashboards/:id', 
    component: DashboardComponent
  },
  {
    path: 'user-manager', 
    pathMatch: 'full',
    component: UserManagerComponent,
    title: 'User Manager',
    data: { group: 'Admin' }
  }
];
