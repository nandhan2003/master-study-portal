import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetmaterialsComponent } from './netmaterials.component';

describe('NetmaterialsComponent', () => {
  let component: NetmaterialsComponent;
  let fixture: ComponentFixture<NetmaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetmaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetmaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
