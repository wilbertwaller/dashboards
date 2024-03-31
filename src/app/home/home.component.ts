import { Component, OnInit } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Route, Router, RouterModule } from "@angular/router";
import { pick } from 'lodash';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, NavbarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  groups: { name: string; paths: Route[] }[] = [];

  constructor(private router: Router) {}

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
    this.groups = Array.from(groupMap, ([name, paths]) => ({ name, paths }));
  }
}