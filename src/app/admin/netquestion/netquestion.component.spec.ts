import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetquestionComponent } from './netquestion.component';

describe('NetquestionComponent', () => {
  let component: NetquestionComponent;
  let fixture: ComponentFixture<NetquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
