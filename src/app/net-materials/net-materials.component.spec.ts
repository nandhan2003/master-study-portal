import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetMaterialsComponent } from './net-materials.component';

describe('NetMaterialsComponent', () => {
  let component: NetMaterialsComponent;
  let fixture: ComponentFixture<NetMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
