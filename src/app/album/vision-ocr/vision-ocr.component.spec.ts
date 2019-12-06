import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionOcrComponent } from './vision-ocr.component';

describe('VisionOcrComponent', () => {
  let component: VisionOcrComponent;
  let fixture: ComponentFixture<VisionOcrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionOcrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
