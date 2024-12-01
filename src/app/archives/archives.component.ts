import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from '../navbar/navbar.component';
import { Route, RouterModule } from '@angular/router';
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
export class ArchivesComponent implements OnInit {
  groups: Group[] = [];

  private destroyRef = inject(DestroyRef);
  private unassociated = 'Unassociated';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.dashboards.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((dashboards: Dashboard[]) => {
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
