import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MscSyllabusComponent } from './msc-syllabus.component';

describe('MscSyllabusComponent', () => {
  let component: MscSyllabusComponent;
  let fixture: ComponentFixture<MscSyllabusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MscSyllabusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MscSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
