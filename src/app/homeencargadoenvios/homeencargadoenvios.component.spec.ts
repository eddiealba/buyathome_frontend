import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeencargadoenviosComponent } from './homeencargadoenvios.component';

describe('HomeencargadoenviosComponent', () => {
  let component: HomeencargadoenviosComponent;
  let fixture: ComponentFixture<HomeencargadoenviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeencargadoenviosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeencargadoenviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
