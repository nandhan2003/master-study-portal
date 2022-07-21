import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MscSeme4Component } from './msc-seme4.component';

describe('MscSeme4Component', () => {
  let component: MscSeme4Component;
  let fixture: ComponentFixture<MscSeme4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MscSeme4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MscSeme4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
