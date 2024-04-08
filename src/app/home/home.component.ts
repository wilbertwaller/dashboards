import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Route, Router, RouterModule } from "@angular/router";
import { concat, pick } from 'lodash';
import { CommonModule } from "@angular/common";
import { DashboardService } from "../dashboards/dashboard.service";
import { Dashboard } from "../dashboards/dashboard.model";
import { Subject, takeUntil } from "rxjs";

interface Group {
  name: string;
  paths: Route[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, NavbarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['../shared/shared-styles.css', './home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<boolean>();
  private unassociated = 'Unassociated';

  groups: Group[] = [];

  constructor(private router: Router, private dashboardService: DashboardService) {}

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    const initialRoutes = this.buildInitialRoutes();
    this.dashboardService.dashboards.pipe(takeUntil(this.onDestroy$)).subscribe((dashboards: Dashboard[]) => {
      const additionalRoutes = this.buildAdditionalRoutes(dashboards);
      this.groups = concat(initialRoutes, additionalRoutes);
    });
  }

  private buildInitialRoutes(): Group[] {
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

  private buildAdditionalRoutes(dashboards: Dashboard[]): Group[] {
    const groupMap = dashboards.reduce((map, dashboard) => {
      const key = dashboard.group || this.unassociated;
      const routes = map.get(key) ?? [];
      routes.push({ path: `dashboards/${dashboard.id}`, title: dashboard.name });
      map.set(key, routes);
      return map;
    }, new Map<string, Route[]>());
    return Array.from(groupMap, ([name, paths]) => ({ name, paths }));
  }
}