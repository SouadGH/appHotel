import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingFDCPage } from './setting-fdc.page';

describe('SettingFDCPage', () => {
  let component: SettingFDCPage;
  let fixture: ComponentFixture<SettingFDCPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingFDCPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingFDCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
