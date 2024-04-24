import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Feedback } from '../feedback.model';
import { FeedbackService } from '../feedback.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [MatTableModule, NavbarComponent],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnDestroy, OnInit {
  private isDestroyed$ = new Subject<boolean>();

  dataSource = new MatTableDataSource<Feedback>();
  displayedColumns: string[] = ['dashboardName', 'title', 'summary'];

  constructor(private feedbackService: FeedbackService) {}

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
