import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionPictureComponent } from './vision-picture.component';

describe('VisionPictureComponent', () => {
  let component: VisionPictureComponent;
  let fixture: ComponentFixture<VisionPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
