import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTableDialogComponent } from './configure-table-dialog.component';

describe('ConfigureTableDialogComponent', () => {
  let component: ConfigureTableDialogComponent;
  let fixture: ComponentFixture<ConfigureTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureTableDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigureTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
