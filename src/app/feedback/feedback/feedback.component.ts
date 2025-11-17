import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Feedback } from '../feedback.model';
import { FeedbackService } from '../feedback.service';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
    selector: 'app-feedback',
    imports: [MatSortModule, MatTableModule, NavbarComponent],
    templateUrl: './feedback.component.html',
    styleUrls: ['../../shared/shared-styles.css', './feedback.component.css']
})
export class FeedbackComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Feedback>();
  displayedColumns: string[] = ['dashboardName', 'title', 'summary'];

  private destroyRef = inject(DestroyRef);

  constructor(private feedbackService: FeedbackService) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.feedbackService.feedback
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((feedback: Feedback[]) => {
        this.dataSource.data = feedback ?? [];
      });
  }
}
