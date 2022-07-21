import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MscSeme2Component } from './msc-seme2.component';

describe('MscSeme2Component', () => {
  let component: MscSeme2Component;
  let fixture: ComponentFixture<MscSeme2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MscSeme2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MscSeme2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
