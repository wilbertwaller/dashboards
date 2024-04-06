import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DashboardService } from '../dashboards/dashboard.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  title = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    let title = <string>this.route.snapshot.title;
    if (!title) {
      const id = <string>this.route.snapshot.paramMap.get('id');
      const dashboard = this.dashboardService.getDashboardById(id);
      title = <string>dashboard?.name ?? '';
    }
    this.title = title;
  }
}
