import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DashboardService } from '../dashboards/dashboard.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../feedback/feedback-dialog/feedback-dialog.component';
import { Feedback } from '../feedback/feedback.model';

@Component({
    selector: 'app-navbar',
    imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule, RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  title = '';

  constructor(
    private readonly route: ActivatedRoute,
    private dialog: MatDialog,
    private readonly dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    let title = <string>this.route.snapshot.title;
    if (!title) {
      const id = <string>this.route.snapshot.paramMap.get('id');
      const dashboard = this.dashboardService.getDashboardById(id);
      if (dashboard) {
        const archived = dashboard?.isArchived ? '(Archived)' : '';
        title = `${<string>dashboard?.name} ${archived}`.trim();
      }
    }
    this.title = title;
  }

  onAddFeedback(): void {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      autoFocus: false,
      data: { dashboardName: this.title },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((feedback: Feedback) => {

    })
  }
}
