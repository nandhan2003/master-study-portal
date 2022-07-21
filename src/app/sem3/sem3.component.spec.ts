import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sem3Component } from './sem3.component';

describe('Sem3Component', () => {
  let component: Sem3Component;
  let fixture: ComponentFixture<Sem3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sem3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sem3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
