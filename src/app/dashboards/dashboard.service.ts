import { Injectable } from '@angular/core';
import { Dashboard } from './dashboard.model';
import { BehaviorSubject } from 'rxjs';
import { merge } from 'lodash';

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

  updateDashboard(id: string, updates: Dashboard): void {
    this._dashboards = this._dashboards.map((dashboard: Dashboard) => {
      if (dashboard.id === id) {
        return merge({}, dashboard, updates);
      }
      return dashboard;
    });
    this.dashboards.next(this._dashboards);
  }

  removeDashboard(id: string): void {
    this._dashboards = this._dashboards.filter((dashboard: Dashboard) => dashboard.id !== id);
    this.dashboards.next(this._dashboards);
  }
}
