import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mcasem1Component } from './mcasem1.component';

describe('Mcasem1Component', () => {
  let component: Mcasem1Component;
  let fixture: ComponentFixture<Mcasem1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mcasem1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mcasem1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
