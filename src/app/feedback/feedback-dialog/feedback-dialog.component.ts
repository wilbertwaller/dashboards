import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DashboardService } from '../../dashboards/dashboard.service';
import { Dashboard } from '../../dashboards/dashboard.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Feedback } from '../feedback.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
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
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.css'
})
export class FeedbackDialogComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined;
  
  private dashboards: string[] = [];

  filteredDashboards: string[] = [];
  formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dashboardName: string },
    private dialogRef: MatDialogRef<FeedbackDialogComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      dashboardName: [this.data.dashboardName ?? ''],
      summary: ['', Validators.required]
    });
    this.dashboardService.dashboards.subscribe((dashboards: Dashboard[]) => {
      this.dashboards = dashboards
        .filter((dashboard: Dashboard) => !dashboard.isArchived)
        .map((dashboard: Dashboard) => dashboard.name);
    });
  }

  filter(): void {
    const filterValue = this.input?.nativeElement.value.toLowerCase();
    this.filteredDashboards = this.dashboards.filter((name: string) => filterValue ? name.toLowerCase().includes(filterValue) : true);
  }

  getErrorMessage(formControlName: string): string {
    const ctrl = this.formGroup.get(formControlName);
    if (ctrl?.hasError('required')) return 'Field is required';
    return '';
  }

  saveFeedback(): void {
    const feedback = new Feedback(this.formGroup.value);
    this.dialogRef.close(feedback);
  }
}
