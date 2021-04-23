import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepersonalventasComponent } from './homepersonalventas.component';

describe('HomepersonalventasComponent', () => {
  let component: HomepersonalventasComponent;
  let fixture: ComponentFixture<HomepersonalventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepersonalventasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepersonalventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
