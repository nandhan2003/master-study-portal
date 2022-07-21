import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McaSyllabusComponent } from './mca-syllabus.component';

describe('McaSyllabusComponent', () => {
  let component: McaSyllabusComponent;
  let fixture: ComponentFixture<McaSyllabusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McaSyllabusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McaSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
