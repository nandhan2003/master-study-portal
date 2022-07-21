import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondpageMcaComponent } from './secondpage-mca.component';

describe('SecondpageMcaComponent', () => {
  let component: SecondpageMcaComponent;
  let fixture: ComponentFixture<SecondpageMcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondpageMcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondpageMcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
