import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McaSeme2Component } from './mca-seme2.component';

describe('McaSeme2Component', () => {
  let component: McaSeme2Component;
  let fixture: ComponentFixture<McaSeme2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McaSeme2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McaSeme2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
