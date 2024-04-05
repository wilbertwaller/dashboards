import { Injectable } from '@angular/core';
import { Dashboard } from './dashboard.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _dashboards: Dashboard[] = [];
  dashboards = new BehaviorSubject<Dashboard[]>(this._dashboards);

  constructor() {}

  addDashboard(dashboard: Dashboard): void {
    this._dashboards.push(dashboard);
    this.dashboards.next(this._dashboards);
  }
}
