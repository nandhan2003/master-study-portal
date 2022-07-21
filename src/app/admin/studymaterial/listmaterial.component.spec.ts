import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmaterialComponent } from './listmaterial.component';

describe('ListmaterialComponent', () => {
  let component: ListmaterialComponent;
  let fixture: ComponentFixture<ListmaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
