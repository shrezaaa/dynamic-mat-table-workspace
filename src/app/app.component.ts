import { Component, ViewChild } from '@angular/core';
// import { TableField, TableRow, PrintConfig,
//   TableVirtualScrollDataSource, TableSelectionMode,
//   DynamicMatTableComponent, TablePagination, TableSetting, ActionMenu } from './dynamic-mat-table/public-api';
import {TableField, TableRow, PrintConfig,
        TableVirtualScrollDataSource, TableSelectionMode,
        DynamicMatTableComponent, TablePagination, TableSetting, ActionMenu } from 'dynamic-mat-table';

const DATA = getData(500);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dynamic-mat-table';
  eventLog = [];
  setting: any;
  // required
  fields: TableField<any>[] = [];
  dataSource = new TableVirtualScrollDataSource([]);
  // optinaol
  // setting: TableSetting;
  actionMenu: ActionMenu[] = [];
  stickyHeader = true;
  showNoData = true;
  showProgress = true;
  pending = false;
  tableSelection: TableSelectionMode = 'none';
  conditinalClass = false;
  pagination: TablePagination = { pageIndex: 0, pageSize: 10, pageSizeOptions: [ 5, 10, 100, 1000], showFirstLastButtons: true };
  enablingPagination = false;
  direction: 'rtl' | 'ltr' = 'ltr';
  printConfig: PrintConfig = { title: 'Print All Test Data' , showParameters: true };
  @ViewChild(DynamicMatTableComponent, {static: true}) table: DynamicMatTableComponent<TestElement>;

  constructor() {
    this.fields = [
      {name: 'row', type: 'number'},
      {name: 'name', header: 'Element Name' , sticky: 'start'},
      {name: 'weight'},
      {name: 'color'},
      {name: 'brand', icon: 'commute', iconColor: 'red'}
    ];

    this.actionMenu.push(
      {
        name: 'Edit',
        text: 'ویرایش',
        color: 'primary',
        icon: 'edit',
        disabled: false,
        visible: true,

      },
      {
        name: 'Delete',
        text: 'حذف',
        color: 'warn',
        icon: 'delete',
        disabled: false,
        visible: true
      },
      {
        name: 'View',
        text: 'مشاهده',
        color: 'accent',
        icon: 'all_inbox',
        disabled: false,
        visible: true
      }
    );
  }

  fetchData_onClick() {

    this.dataSource = new TableVirtualScrollDataSource(DATA);
    this.dataSource.allData[0].actionMenu = {
      View: { text: 'View', color: 'primary', icon: 'build_circle'},
      Delete: {visible: false}
    };
  }

  table_onChangeSetting(setting) {
    console.log(setting);
  }

  table_onRowActionChange(e) {
    this.eventLog.push(e);
  }

  table_onRowClick(e) {
    this.eventLog.push(e);
  }

  columnSticky_onClick(columnSticky, type) {
    console.log(this.fields);

    if ( this.fields[columnSticky].sticky === type ) {
      this.fields[columnSticky].sticky = 'none';
    } else {
      this.fields[columnSticky].sticky = type;
    }
    console.log(this.fields);
  }

  tableSelection_onClick() {
    if (this.tableSelection === 'multi') {
      this.tableSelection = 'single';
    } else if (this.tableSelection === 'single') {
      this.tableSelection = 'none';
    } else {
      this.tableSelection = 'multi';
    }
  }

  addNewColumn_onClick() {
    this.fields.push({
      name: 'type', header: 'Car Type'
    });
    const cloned = this.fields.map(x => Object.assign({}, x));
    this.fields = cloned;
  }

  addNewLongColumn_onClick() {
    this.fields.push({
      name: 'longText', header: 'Long Text'
    });
    const cloned = this.fields.map(x => Object.assign({}, x));
    this.fields = cloned;
  }

  paginationMode_onClick() {
    if ( this.enablingPagination === true) {
      this.enablingPagination = false;
    } else {
      this.enablingPagination = true;
    }
  }

  direction_onClick() {
    if (this.direction === 'ltr') {
      this.direction = 'rtl';
    } else {
      this.direction = 'ltr';
    }
  }


}


export interface TestElement extends TableRow {
  row: number;
  name: string;
  weight: string;
  color: string;
  brand: string;
}

export function getData(n = 1000): TestElement[] {
  return Array.from({ length: n }, (v, i) => ({
    row: i + 1,
    name: `Element #${i + 1}`,
    weight: Math.floor(Math.random() * 100) + ' KG',
    color: (['Red', 'Green', 'Blue', 'Yellow', 'Magenta'])[Math.floor(Math.random() * 5)],
    brand: (['Irankhodro', 'SAIPA', 'Kerman Khodro', 'Zanjan Benz', 'Tehran PIKEY'])[Math.floor(Math.random() * 5)],
    type: (['SUV', 'Truck', 'Sedan', 'Van', 'Coupe' , 'Sports Car'])[Math.floor(Math.random() * 6)],
    longText: (['Overdub: Correct your voice recordings by simply typing. Powered by Lyrebird AI.',
     'Multitrack recording — Descript dynamically generates a single combined transcript.',
     'Our style of podcasting and editing wouldn’t be possible without Descript.',
     'Live Collaboration: Real time multiuser editing and commenting.',
     'Use the Timeline Editor for fine-tuning with fades and volume editing.',
     'Edit audio by editing text. Drag and drop to add music and sound effects.'])[Math.floor(Math.random() * 6)],
  }));
}
