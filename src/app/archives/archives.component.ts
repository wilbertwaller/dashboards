import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from '../navbar/navbar.component';
import { Route, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../dashboards/dashboard.service';
import { Dashboard } from '../dashboards/dashboard.model';

interface Group {
  name: string;
  paths: Route[];
}

@Component({
  selector: 'app-archives',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, NavbarComponent, RouterModule],
  templateUrl: './archives.component.html',
  styleUrls: ['../shared/shared-styles.css', './archives.component.css']
})
export class ArchivesComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject<boolean>();
  private unassociated = 'Unassociated';

  groups: Group[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  ngOnInit(): void {
    this.dashboardService.dashboards.pipe(takeUntil(this.isDestroyed$)).subscribe((dashboards: Dashboard[]) => {
      this.groups = this.getDashboardRoutes(dashboards);
    });
  }

  private getDashboardRoutes(dashboards: Dashboard[]): Group[] {
    const groupMap = dashboards
      .filter((dashboard: Dashboard) => dashboard.isArchived)
      .reduce((map, dashboard) => {
        const key = dashboard.group || this.unassociated;
        const routes = map.get(key) ?? [];
        routes.push({ path: `/dashboards/${dashboard.id}`, title: dashboard.name });
        map.set(key, routes);
        return map;
      }, new Map<string, Route[]>());
    return Array.from(groupMap, ([name, paths]) => ({ name, paths }));
  }
}
