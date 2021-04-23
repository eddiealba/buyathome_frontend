import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarventasComponent } from './navbarventas.component';

describe('NavbarventasComponent', () => {
  let component: NavbarventasComponent;
  let fixture: ComponentFixture<NavbarventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarventasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
