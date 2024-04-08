import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { v4 as uuid } from 'uuid';
import { DashboardService } from '../../../dashboard.service';
import { Dashboard } from '../../../dashboard.model';
import { uniq } from 'lodash';

@Component({
  selector: 'app-create-dashboard-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-dashboard-dialog.component.html',
  styleUrl: './create-dashboard-dialog.component.css'
})
export class CreateDashboardDialogComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined;

  filteredGroups: string[] = [];
  formGroup!: FormGroup;
  groups: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreateDashboardDialogComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [uuid(), Validators.required],
      name: ['', [Validators.required, this.dashboardService.existingNameValidator()]],
      group: [''],
      isExercise: [false]
    });
    this.dashboardService.dashboards.subscribe((dashboards: Dashboard[]) => {
      this.groups = uniq(dashboards.map((dashboard: Dashboard) => dashboard.group));
    });
  }

  filter(): void {
    const filterValue = this.input?.nativeElement.value.toLowerCase();
    this.filteredGroups = this.groups.filter((group: string) => filterValue ? group.toLowerCase().includes(filterValue) : true);
  }

  getErrorMessage(formControlName: string): string {
    const ctrl = this.formGroup.get(formControlName);
    if (ctrl?.hasError('required')) return 'Field is required';
    if (ctrl?.hasError('existingName')) return 'Name already exists';
    return '';
  }

  saveDashboard(): void {
    const { id, name, group, isExercise } = this.formGroup.value;
    const dashboard = new Dashboard(<string>id, <string>name, <string>group || 'Unassociated', <boolean>isExercise);
    this.dashboardService.addDashboard(dashboard);
    this.dialogRef.close(dashboard);
  }
}
