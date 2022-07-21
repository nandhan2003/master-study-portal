import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sem1Component } from './sem1.component';

describe('Sem1Component', () => {
  let component: Sem1Component;
  let fixture: ComponentFixture<Sem1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sem1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sem1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
