import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mcasem2Component } from './mcasem2.component';

describe('Mcasem2Component', () => {
  let component: Mcasem2Component;
  let fixture: ComponentFixture<Mcasem2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mcasem2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mcasem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
