import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyDashboardDialogComponent } from './copy-dashboard-dialog.component';

describe('CopyDashboardDialogComponent', () => {
  let component: CopyDashboardDialogComponent;
  let fixture: ComponentFixture<CopyDashboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyDashboardDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyDashboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
