import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FemmedemenagePage } from './femmedemenage.page';

describe('FemmedemenagePage', () => {
  let component: FemmedemenagePage;
  let fixture: ComponentFixture<FemmedemenagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FemmedemenagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FemmedemenagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
