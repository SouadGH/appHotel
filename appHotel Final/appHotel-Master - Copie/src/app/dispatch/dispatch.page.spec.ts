import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchPage } from './dispatch.page';

describe('DispatchPage', () => {
  let component: DispatchPage;
  let fixture: ComponentFixture<DispatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
