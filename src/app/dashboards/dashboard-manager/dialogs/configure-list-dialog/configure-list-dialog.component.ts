import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FilterType, Panel, PanelType } from '../../../panel.model';

@Component({
    selector: 'app-configure-list-dialog',
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
        MatSelectModule,
        ReactiveFormsModule
    ],
    templateUrl: './configure-list-dialog.component.html',
    styleUrl: './configure-list-dialog.component.css'
})
export class ConfigureListDialogComponent implements OnInit {
  filterType = FilterType;
  formGroup!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ConfigureListDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: [''],
      filterType: [''],
      type: [PanelType.List, Validators.required]
    });
  }

  addPanel(): void {
    const panel = new Panel(this.formGroup.value);
    this.dialogRef.close(panel);
  }
}
