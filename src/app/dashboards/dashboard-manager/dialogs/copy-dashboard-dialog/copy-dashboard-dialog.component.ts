import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DashboardService } from '../../../dashboard.service';
import { Dashboard } from '../../../dashboard.model';

@Component({
    selector: 'app-copy-dashboard-dialog',
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    templateUrl: './copy-dashboard-dialog.component.html',
    styleUrl: './copy-dashboard-dialog.component.css'
})
export class CopyDashboardDialogComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dashboard: Dashboard },
    private dialogRef: MatDialogRef<CopyDashboardDialogComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    const dashboard = this.data.dashboard;
    this.formGroup = this.formBuilder.group({
      name: [dashboard?.name + ' (Copy)', [Validators.required, this.dashboardService.existingNameValidator()]],
      group: [dashboard?.group || ''],
      isExercise: [dashboard?.isExercise ?? false]
    });
  }

  getErrorMessage(formControlName: string): string {
    const ctrl = this.formGroup.get(formControlName);
    if (ctrl?.hasError('required')) return 'Field is required';
    if (ctrl?.hasError('existingName')) return 'Name already exists';
    return '';
  }

  saveDashboard(): void {
    const dashboard = new Dashboard(this.formGroup.value);
    this.dashboardService.addDashboard(dashboard);
    this.dialogRef.close(dashboard);
  }
}
