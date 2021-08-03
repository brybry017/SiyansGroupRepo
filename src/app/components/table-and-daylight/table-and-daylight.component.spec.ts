import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAndDaylightComponent } from './table-and-daylight.component';

describe('TableAndDaylightComponent', () => {
  let component: TableAndDaylightComponent;
  let fixture: ComponentFixture<TableAndDaylightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAndDaylightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAndDaylightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
