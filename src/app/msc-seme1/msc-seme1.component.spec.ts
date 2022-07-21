import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MscSeme1Component } from './msc-seme1.component';

describe('MscSeme1Component', () => {
  let component: MscSeme1Component;
  let fixture: ComponentFixture<MscSeme1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MscSeme1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MscSeme1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
