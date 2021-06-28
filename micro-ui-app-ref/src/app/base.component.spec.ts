import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponent, filterDate } from './base.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';

const cols = [{ field: 'vin', header: 'Vin' }, { field: 'year', header: 'Year' }];

@Component({
  template: `
    <h3 class="first">Basic</h3>
    <p-table [value]="cars" id="table" #dt>
      <ng-template pTemplate="header">
        <tr>
          <th>Vin</th>
          <th>Year</th>
          <th>Brand</th>
          <th>Color</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-car>
        <tr>
          <td>{{ car.vin }}</td>
          <td>{{ car.year }}</td>
          <td>{{ car.brand }}</td>
          <td>{{ car.color }}</td>
        </tr>
      </ng-template>
    </p-table>

    <h3>Dynamic Columns</h3>
    <p-table [columns]="cols" [value]="cars">
      <ng-template pTemplate="header" let-columns>
        <tr>
          <th *ngFor="let col of columns">
            {{ col.header }}
          </th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-rowData let-columns="columns">
        <tr>
          <td *ngFor="let col of columns">
            {{ rowData[col.field] }}
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
class TestBaseComponent extends BaseComponent implements OnInit {
  cars: any[] = [{ vin: 'vin', year: 'year' }];
  cols: any[] = cols;
  @ViewChild('dt') dataTable: any;
}

describe('BaseComponent', () => {
  let component: TestBaseComponent;
  let fixture: ComponentFixture<TestBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TableModule],
      declarations: [TestBaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return dropdown height', () => {
    const rs = component.getDropdownHeight(['', '']);
    expect(rs).toEqual('64px');
  });

  it('should not reset table when data=undefined', () => {
    const rs = component.resetTable(undefined);
    expect(rs).toBeUndefined();
  });

  it('should reset table when has data', () => {
    spyOn(component.dataTable, 'reset');
    component.resetTable(component.dataTable);
    expect(component.dataTable.reset).toHaveBeenCalled();
  });

  it('init selected columns', () => {
    component.cols = cols;
    component.initSelectedColumns(component.cols);
    expect(component.colsEnable.length).toEqual(2);
  });

  it('show column dialog', () => {
    component.showColumnDialog(null);
    expect(component.isDisplayColumnsDialog).toBeTruthy();
  });

  it('hide column dialog', () => {
    component.hideColumnDialog(null);
    expect(component.isDisplayColumnsDialog).toBeFalsy();
  });

  it('should return "table-cell"', () => {
    component.colsEnable = [true];
    const rs = component.getColumnStyle(0);
    expect(rs).toEqual('table-cell');
  });

  it('should return "none"', () => {
    component.colsEnable = [];
    const rs = component.getColumnStyle(0);
    expect(rs).toEqual('none');
  });

  it('should return has no column index', () => {
    component.colsEnable = [];
    const rs = component.isColumnStyle(0);
    expect(rs).toBeFalsy();
  });

  it('should do nothing when uncheck columns', () => {
    component.selectedColumns = [{ field: 'test' }, { field: 'test1' }];
    const event = {
      itemValue: {
        field: 'test2',
      },
    };
    const rs = component.toggleColumnChanged(event);
    expect(rs).toBeUndefined();
  });

  it('should return check columns have been ordered', () => {
    const data = [
      { field: 'test', order: 2 },
      { field: 'test1', order: 1 },
      { field: 'test2', order: 3 },
      { field: 'test3', order: 4 },
    ];
    component.selectedColumns = data;
    const event = {
      itemValue: {
        field: 'test',
      },
    };
    component.toggleColumnChanged(event);
    expect(component.selectedColumns[0].field).toEqual('test1');
  });

  it('should do nothing when call filterDate without data', () => {
    const dataToFilter = [
      {
        date: new Date(2018, 11, 25, 10, 33, 30),
      },
    ];
    const rs = filterDate(undefined, dataToFilter, 'date');
    expect(rs.length).toEqual(dataToFilter.length);
  });

  it('should return filter date', () => {
    const dataToFilter = [
      {
        date: new Date(2018, 11, 25, 10, 33, 30),
      },
      {
        date: new Date(2018, 11, 24, 10, 33, 30),
      },
      {
        date: new Date(2018, 12, 24, 10, 33, 30),
      },
    ];
    const rs = filterDate(
      [new Date(2018, 11, 24, 10, 33, 30), new Date(2018, 12, 24, 10, 33, 30)],
      dataToFilter,
      'date'
    );
    expect(rs.length).toEqual(3);
  });
});
