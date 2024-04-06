import { Component, OnInit } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Route, Router, RouterModule } from "@angular/router";
import { concat, pick } from 'lodash';
import { CommonModule } from "@angular/common";
import { DashboardService } from "../dashboards/dashboard.service";
import { Dashboard } from "../dashboards/dashboard.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, NavbarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['../shared/shared-styles.css', './home.component.css']
})
export class HomeComponent implements OnInit {
  groups: { name: string; paths: Route[] }[] = [];

  constructor(private router: Router, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    const groupMap = this.router.config.reduce((map, route) => {
      const key = route?.data?.['group'];
      if (key) {
        const routes = map.get(key) ?? [];
        routes.push(pick(route, ['path', 'title']));
        map.set(key, routes);
      }
      return map;
    }, new Map<string, Route[]>());
    const initialRoutes = Array.from(groupMap, ([name, paths]) => ({ name, paths }));
    const unassociated = 'Unassociated';
    this.dashboardService.dashboards.subscribe((dashboards: Dashboard[]) => {
      const groupMap = dashboards.reduce((map, dashboard) => {
        const key = dashboard.group || unassociated;
        const routes = map.get(key) ?? [];
        routes.push({ path: `dashboards/${dashboard.id}`, title: dashboard.name });
        map.set(key, routes);
        return map;
      }, new Map<string, Route[]>());
      const additionalRoutes = Array.from(groupMap, ([name, paths]) => ({ name, paths }));
      this.groups = concat(initialRoutes, additionalRoutes);
    })
  }
}