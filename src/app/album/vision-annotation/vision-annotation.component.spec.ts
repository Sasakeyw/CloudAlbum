import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionAnnotationComponent } from './vision-annotation.component';

describe('VisionAnnotationComponent', () => {
  let component: VisionAnnotationComponent;
  let fixture: ComponentFixture<VisionAnnotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionAnnotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
