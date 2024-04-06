import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDashboardDialogComponent } from './delete-dashboard-dialog.component';

describe('DeleteDashboardDialogComponent', () => {
  let component: DeleteDashboardDialogComponent;
  let fixture: ComponentFixture<DeleteDashboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDashboardDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDashboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
