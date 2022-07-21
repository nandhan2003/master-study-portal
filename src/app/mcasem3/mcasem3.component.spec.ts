import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mcasem3Component } from './mcasem3.component';

describe('Mcasem3Component', () => {
  let component: Mcasem3Component;
  let fixture: ComponentFixture<Mcasem3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mcasem3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mcasem3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
