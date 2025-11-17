import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavbarComponent } from "../navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Route, Router, RouterModule } from "@angular/router";
import { concat, pick } from 'lodash';
import { CommonModule } from "@angular/common";
import { DashboardService } from "../dashboards/dashboard.service";
import { Dashboard } from "../dashboards/dashboard.model";

interface Group {
  name: string;
  paths: Route[];
}

@Component({
    selector: 'app-home',
    imports: [CommonModule, MatCardModule, MatListModule, NavbarComponent, RouterModule],
    templateUrl: './home.component.html',
    styleUrls: ['../shared/shared-styles.css', './home.component.css']
})
export class HomeComponent implements OnInit {
  groups: Group[] = [];

  private destroyRef = inject(DestroyRef);
  private unassociated = 'Unassociated';

  constructor(private router: Router, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    const initialRoutes = this.getInitialRoutes();
    this.dashboardService.dashboards.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((dashboards: Dashboard[]) => {
      const additionalRoutes = this.getAdditionalRoutes(dashboards);
      this.groups = concat(initialRoutes, additionalRoutes);
    });
  }

  private getInitialRoutes(): Group[] {
    const groupMap = this.router.config.reduce((map, route) => {
      const key = route?.data?.['group'];
      if (key) {
        const routes = map.get(key) ?? [];
        routes.push(pick(route, ['path', 'title']));
        map.set(key, routes);
      }
      return map;
    }, new Map<string, Route[]>());
    return Array.from(groupMap, ([name, paths]) => ({ name, paths }));
  }

  private getAdditionalRoutes(dashboards: Dashboard[]): Group[] {
    const groupMap = dashboards
      .filter((dashboard: Dashboard) => !dashboard.isArchived)
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