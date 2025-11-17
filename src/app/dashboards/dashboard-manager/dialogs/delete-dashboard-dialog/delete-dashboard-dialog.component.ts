import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Dashboard } from '../../../dashboard.model';
import { DashboardService } from '../../../dashboard.service';

@Component({
    selector: 'app-delete-dashboard-dialog',
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatIconModule
    ],
    templateUrl: './delete-dashboard-dialog.component.html',
    styleUrl: './delete-dashboard-dialog.component.css'
})
export class DeleteDashboardDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dashboard: Dashboard },
    private dialogRef: MatDialogRef<DeleteDashboardDialogComponent>,
    private dashboardService: DashboardService
  ) {}

  deleteDashboard(): void {
    this.dashboardService.removeDashboard(this.data.dashboard.id);
    this.dialogRef.close(true);
  }
}
