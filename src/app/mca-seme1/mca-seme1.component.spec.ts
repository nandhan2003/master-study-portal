import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McaSeme1Component } from './mca-seme1.component';

describe('McaSeme1Component', () => {
  let component: McaSeme1Component;
  let fixture: ComponentFixture<McaSeme1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McaSeme1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McaSeme1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
