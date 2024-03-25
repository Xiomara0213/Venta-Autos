/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PgClientesRegComponent } from './PgClientesReg.component';

describe('PgClientesRegComponent', () => {
  let component: PgClientesRegComponent;
  let fixture: ComponentFixture<PgClientesRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgClientesRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgClientesRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

