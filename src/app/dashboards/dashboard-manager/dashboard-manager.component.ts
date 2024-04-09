import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateDashboardDialogComponent } from './dialogs/create-dashboard-dialog/create-dashboard-dialog.component';
import { DashboardService } from '../dashboard.service';
import { Dashboard } from '../dashboard.model';
import { CopyDashboardDialogComponent } from './dialogs/copy-dashboard-dialog/copy-dashboard-dialog.component';
import { DeleteDashboardDialogComponent } from './dialogs/delete-dashboard-dialog/delete-dashboard-dialog.component';
import { Subject, takeUntil } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { omit } from 'lodash';

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
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    NavbarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard-manager.component.html',
  styleUrls: ['../../shared/shared-styles.css', './dashboard-manager.component.css']
})
export class DashboardManagerComponent implements OnDestroy, OnInit {
  @ViewChild('dashboardInput') dashboardInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('groupInput') groupInput: ElementRef<HTMLInputElement> | undefined;

  private dashboards: Dashboard[] = [];
  private onDestroy$ = new Subject<boolean>();
  private selectedDashboard: Dashboard | undefined;
  private unassociated = 'Unassociated';

  dashboardCtrl = new FormControl('');
  filteredDashboardGroups: Group[] = [];
  filteredGroups: string[] = [];
  formGroup!: FormGroup;
  groups: string[] = [];
  groupOptions: Group[] = [];

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private dashboardService: DashboardService) {}

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.dashboardService.dashboards.pipe(takeUntil(this.onDestroy$)).subscribe((dashboards: Dashboard[]) => {
      this.dashboards = dashboards;
      this.groupOptions = this.getGroupOptions(dashboards);
    });
    this.formGroup = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, this.dashboardService.existingNameValidator()]],
      group: [''],
      isExercise: [false],
      isArchived: [false]
    });
    this.dashboardCtrl.valueChanges.subscribe((value: string | null) => {
      this.selectedDashboard = this.dashboards.find((dashboard: Dashboard) => dashboard.name === value);
      this.formGroup.setValue({
        id: this.selectedDashboard?.id,
        name: this.selectedDashboard?.name,
        group: this.selectedDashboard?.group,
        isExercise: this.selectedDashboard?.isExercise,
        isArchived: this.selectedDashboard?.isArchived
      });
    })
  }

  getGroupOptions(dashboards: Dashboard[]): Group[] {
    const groupMap = dashboards.reduce((map, dashboard) => {
      const group = dashboard.group;
      if (group) {
        const dashboards = map.get(group) ?? [];
        dashboards.push(dashboard.name);
        map.set(group, dashboards);
      } else {
        const dashboards = map.get(this.unassociated) ?? [];
        dashboards.push(dashboard.name);
        map.set(this.unassociated, dashboards);
      }
      return map;
    }, new Map<string, string[]>());
    return Array.from(groupMap, ([name, dashboards]) => ({ name, dashboards }));
  }

  filterDashboard(): void {
    const filterValue = this.dashboardInput?.nativeElement.value.toLowerCase();
    this.filteredDashboardGroups = this.groupOptions
      .map((group: Group) => ({
        name: group.name,
        dashboards: group.dashboards.filter((dashboard: string) => filterValue ? dashboard.toLowerCase().includes(filterValue) : true)
      }))
      .filter((group: Group) => group.dashboards.length > 0);
  }

  filterGroup(): void {
    const filterValue = this.groupInput?.nativeElement.value.toLowerCase();
    this.filteredGroups = this.groups.filter((group: string) => filterValue ? group.toLowerCase().includes(filterValue) : true);
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

  onDeleteDashboard(): void {
    const dialogRef = this.dialog.open(DeleteDashboardDialogComponent, {
      autoFocus: false,
      data: { dashboard: this.selectedDashboard }
    });
    dialogRef.afterClosed().subscribe((deleted: boolean) => {
      if (deleted) {
        this.dashboardCtrl.setValue('');
      }
    });
  }

  onSaveDashboard(): void {
    const id = this.formGroup.value.id;
    const name = this.formGroup.value.name;
    this.dashboardService.updateDashboard(id, omit(this.formGroup.value, 'id'));
    this.dashboardCtrl.setValue(name, { emitEvent: false });
  }

  getErrorMessage(formControlName: string): string {
    const ctrl = this.formGroup.get(formControlName);
    if (ctrl?.hasError('required')) return 'Field is required';
    if (ctrl?.hasError('existingName')) return 'Name already exists';
    return '';
  }
}
