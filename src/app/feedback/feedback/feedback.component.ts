import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Feedback } from '../feedback.model';
import { FeedbackService } from '../feedback.service';
import { Subject, takeUntil } from 'rxjs';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [MatSortModule, MatTableModule, NavbarComponent],
  templateUrl: './feedback.component.html',
  styleUrls: ['../../shared/shared-styles.css', './feedback.component.css']
})
export class FeedbackComponent implements AfterViewInit, OnDestroy, OnInit {
  private isDestroyed$ = new Subject<boolean>();

  dataSource = new MatTableDataSource<Feedback>();
  displayedColumns: string[] = ['dashboardName', 'title', 'summary'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private feedbackService: FeedbackService) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  ngOnInit(): void {
    this.feedbackService.feedback
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((feedback: Feedback[]) => {
        this.dataSource.data = feedback ?? [];
      });
  }
}
