import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomHeadComponent } from './bottom-head.component';

describe('BottomHeadComponent', () => {
  let component: BottomHeadComponent;
  let fixture: ComponentFixture<BottomHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
