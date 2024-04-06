import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CreateDashboardDialogComponent } from './dialogs/create-dashboard-dialog/create-dashboard-dialog.component';
import { DashboardService } from '../dashboard.service';
import { Dashboard } from '../dashboard.model';
import { CopyDashboardDialogComponent } from './dialogs/copy-dashboard-dialog/copy-dashboard-dialog.component';

interface Group {
  name: string;
  dashboards: string[];
}

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
  styleUrls: ['../../shared/shared-styles.css', './dashboard-manager.component.css']
})
export class DashboardManagerComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined;

  private dashboards: Dashboard[] = [];
  private selectedDashboard: Dashboard | undefined;

  dashboardCtrl = new FormControl('');
  filteredGroupOptions: Group[] = [];
  groupOptions: Group[] = [];

  constructor(private dialog: MatDialog, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    const unassociated = 'Unassociated';
    this.dashboardService.dashboards.subscribe((dashboards: Dashboard[]) => {
      const groupMap = dashboards.reduce((map, dashboard) => {
        const group = dashboard.group;
        if (group) {
          const dashboards = map.get(group) ?? [];
          dashboards.push(dashboard.name);
          map.set(group, dashboards);
        } else {
          const dashboards = map.get(unassociated) ?? [];
          dashboards.push(dashboard.name);
          map.set(unassociated, dashboards);
        }
        return map;
      }, new Map<string, string[]>());

      this.dashboards = dashboards;
      this.groupOptions = Array.from(groupMap, ([name, dashboards]) => ({ name, dashboards }));
    });
    this.dashboardCtrl.valueChanges.subscribe((value: string | null) => {
      this.selectedDashboard = this.dashboards.find((dashboard: Dashboard) => dashboard.name === value);
    })
  }

  filter(): void {
    const filterValue = this.input?.nativeElement.value.toLowerCase();
    this.filteredGroupOptions = this.groupOptions
      .map((group: Group) => ({
        name: group.name,
        dashboards: group.dashboards.filter((dashboard: string) => filterValue ? dashboard.toLowerCase().includes(filterValue) : true)
      }))
      .filter((group: Group) => group.dashboards.length > 0);
  }

  onCreateDashboard(): void {
    const dialogRef = this.dialog.open(CreateDashboardDialogComponent, { autoFocus: false });
    dialogRef.afterClosed().subscribe((dashboard: Dashboard) => {
      if (dashboard) {
        this.dashboardCtrl.setValue(dashboard.name);
      }
    });
  }

  onCopyDashboard(): void {
    const dialogRef = this.dialog.open(CopyDashboardDialogComponent, {
      autoFocus: false,
      data: { dashboard: this.selectedDashboard }
    });
    dialogRef.afterClosed().subscribe((dashboard: Dashboard) => {
      if (dashboard) {
        this.dashboardCtrl.setValue(dashboard.name);
      }
    });
  }

  onDeleteDashboard(): void {}

  onSaveDashboard(): void {}
}
