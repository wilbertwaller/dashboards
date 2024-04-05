import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    group: new FormControl(''),
    isExercise: new FormControl(false)
  });
  groups: string[] = [];

  constructor(private dialogRef: MatDialogRef<CreateDashboardDialogComponent>) {}

  ngOnInit(): void {
    this.filteredGroups = this.groups.slice();
  }

  filter(): void {
    const filterValue = this.input?.nativeElement.value.toLowerCase();
    this.filteredGroups = this.groups.filter((group: string) => filterValue ? group.toLowerCase().includes(filterValue) : true);
  }

  saveDashboard(): void {
    console.log(this.formGroup.value)
  }
}
