import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureContentViewerDialogComponent } from './configure-content-viewer-dialog.component';

describe('ConfigureContentViewerDialogComponent', () => {
  let component: ConfigureContentViewerDialogComponent;
  let fixture: ComponentFixture<ConfigureContentViewerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureContentViewerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigureContentViewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
