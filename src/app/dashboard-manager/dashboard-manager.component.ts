import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CreateDashboardDialogComponent } from './dialogs/create-dashboard-dialog/create-dashboard-dialog.component';

@Component({
  selector: 'app-dashboard-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NavbarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard-manager.component.html',
  styleUrls: ['../shared/shared-styles.css', './dashboard-manager.component.css']
})
export class DashboardManagerComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined;

  dashboardCtrl = new FormControl('');
  dashboards: any = [];
  filteredDashboards: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.filteredDashboards = this.dashboards.slice();
  }

  filter(): void {
    const filterValue = this.input?.nativeElement.value.toLowerCase();
    this.filteredDashboards = this.dashboards.filter((dashboard: { name: { toLowerCase: () => (string | undefined)[]; }; }) => dashboard.name.toLowerCase().includes(filterValue));
  }

  onCreateDashboard(): void {
    const dialogRef = this.dialog.open(CreateDashboardDialogComponent, { autoFocus: false });
  }
}
