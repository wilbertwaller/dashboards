import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDashboardDialogComponent } from './create-dashboard-dialog.component';

describe('CreateDashboardDialogComponent', () => {
  let component: CreateDashboardDialogComponent;
  let fixture: ComponentFixture<CreateDashboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDashboardDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDashboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
