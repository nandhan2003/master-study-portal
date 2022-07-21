import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudymaterialsComponent } from './studymaterials.component';

describe('StudymaterialsComponent', () => {
  let component: StudymaterialsComponent;
  let fixture: ComponentFixture<StudymaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudymaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudymaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
