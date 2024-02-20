import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaffecterPage } from './reaffecter_archive.page';

describe('ReaffecterPage', () => {
  let component: ReaffecterPage;
  let fixture: ComponentFixture<ReaffecterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaffecterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaffecterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
