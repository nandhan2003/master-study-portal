import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sem4Component } from './sem4.component';

describe('Sem4Component', () => {
  let component: Sem4Component;
  let fixture: ComponentFixture<Sem4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sem4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sem4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
