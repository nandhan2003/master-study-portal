import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionmcaComponent } from './questionmca.component';

describe('QuestionmcaComponent', () => {
  let component: QuestionmcaComponent;
  let fixture: ComponentFixture<QuestionmcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionmcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionmcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
