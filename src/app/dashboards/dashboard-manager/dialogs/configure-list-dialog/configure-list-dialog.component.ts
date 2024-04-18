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
import { v4 as uuid } from 'uuid';
import { Panel } from '../../../panel.model';

@Component({
  selector: 'app-configure-list-dialog',
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
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './configure-list-dialog.component.html',
  styleUrl: './configure-list-dialog.component.css'
})
export class ConfigureListDialogComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ConfigureListDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [uuid(), Validators.required],
      title: [''],
      filterType: ['']
    });
  }

  addPanel(): void {
    const { id, title, filterType } = this.formGroup.value;
    const panel = new Panel(id, title, filterType);
    this.dialogRef.close(panel);
  }
}
