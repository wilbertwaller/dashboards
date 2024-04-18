import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureListDialogComponent } from './configure-list-dialog.component';

describe('ConfigureListDialogComponent', () => {
  let component: ConfigureListDialogComponent;
  let fixture: ComponentFixture<ConfigureListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureListDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigureListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
