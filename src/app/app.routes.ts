import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, title: 'Dashboards', data: { 'title': 'Dashboards' } },
  { path: 'dashboard-manager', pathMatch: 'full', component: DashboardManagerComponent, title: 'Dashboard Manager', data: { 'title': 'Dashboard Manager' } }
];
