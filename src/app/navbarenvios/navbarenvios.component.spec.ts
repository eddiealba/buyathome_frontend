import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarenviosComponent } from './navbarenvios.component';

describe('NavbarenviosComponent', () => {
  let component: NavbarenviosComponent;
  let fixture: ComponentFixture<NavbarenviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarenviosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarenviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
