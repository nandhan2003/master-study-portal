import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McaSeme3Component } from './mca-seme3.component';

describe('McaSeme3Component', () => {
  let component: McaSeme3Component;
  let fixture: ComponentFixture<McaSeme3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McaSeme3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McaSeme3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
