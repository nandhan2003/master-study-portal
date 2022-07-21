import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MscSeme3Component } from './msc-seme3.component';

describe('MscSeme3Component', () => {
  let component: MscSeme3Component;
  let fixture: ComponentFixture<MscSeme3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MscSeme3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MscSeme3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
