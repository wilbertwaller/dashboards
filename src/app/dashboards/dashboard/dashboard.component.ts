import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Dashboard } from '../dashboard.model';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-dashboard',
    imports: [NavbarComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboard: Dashboard | undefined;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private readonly titleService: Title
  ) {}

  ngOnInit(): void {
    const id = <string>this.route.snapshot.paramMap.get('id');
    this.dashboard = this.dashboardService.getDashboardById(id);
    this.titleService.setTitle(<string>this.dashboard?.name);
  }
}
