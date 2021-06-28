import { Injectable, OnInit } from '@angular/core';
import { DataTable } from 'primeng/primeng';

@Injectable()
export abstract class BaseComponent implements OnInit {
  itemsPerPage = [5, 15, 30];
  selectedColumns: any[] = [];
  // Flag to toggle show/hide dynamic columns
  isDisplayColumnsDialog = false;
  // Keep the previous selected columns
  colsEnable: any[] = [];
  tableName = ''; // used to store column enables, set by extending class

  constructor() {
    this.isDisplayColumnsDialog = false;
  }

  ngOnInit() { }

  getDropdownHeight(dropdownItems: Array<any>) {
    if (!dropdownItems) {
      return;
    }
    return dropdownItems.length * 32 + 'px';
  }

  // Resets sort, filter and paginator state
  resetTable(dataTable: DataTable | undefined) {
    if (!dataTable) {
      return;
    }

    dataTable.reset();
  }

  initSelectedColumns(cols: any) {
    for (let i = 0; i < cols.length; i++) {
      // Keep all checked columns as first time
      this.colsEnable.push(true);
    }
  }

  // Show dialog dynamic columns
  public showColumnDialog(event: any) {
    this.isDisplayColumnsDialog = true;
  }

  // Get cell style for dynamic columns
  public getColumnStyle(index: number) {
    return this.colsEnable[index] ? 'table-cell' : 'none';
  }

  // Check has display columns index
  public isColumnStyle(index: number) {
    return this.colsEnable[index];
  }

  // Toggle column change event when checking/unchecking
  toggleColumnChanged(event: any) {
    // If uncheck columns -> return this functions
    const existed = this.selectedColumns.filter(r => r.field === event.itemValue.field);
    if (existed.length === 0) {
      return;
    }

    // Sort by order to keep original index number
    this.selectedColumns.sort((a, b) => (a.order > b.order ? 1 : b.order > a.order ? -1 : 0));
  }
  // scroll to html element
  scrollToElement(idElement: string) {
    setTimeout(() => {
      const htmlElement = document.getElementById(`${idElement}`) as HTMLElement;
      if (htmlElement) {
        htmlElement.scrollIntoView();
      }
    }, 0);
  }

  // Hide dialog dynamic columns
  public hideColumnDialog(event: any) {
    this.isDisplayColumnsDialog = false;

    // Save table column enables in storage
    // If table has no name, do nothing
    if (this.tableName.length > 0) {
      localStorage.setItem(this.generateKey(), JSON.stringify(this.colsEnable));
    }
  }

  // Sets default column enables based on local storage. If nothing stored,
  // return false and extending component will set default instead
  setDefaultColsEnable(): Boolean {
    const colsEnableStorageStr: string | null = localStorage.getItem(this.generateKey());
    if (colsEnableStorageStr) {
      const colsEnableStorage = JSON.parse(colsEnableStorageStr);
      for (let i = 0; i < this.colsEnable.length; i++) {
        this.colsEnable[i] = colsEnableStorage[i];
      }
      return true;
    } else {
      return false;
    }
  }

  // Clean up dialog dynamic columns
  public resetColumnDialog() {
    // if need to clear all: localStorage.clear();
    localStorage.removeItem(this.generateKey());
    // console.log(' resetColumnDialog  localStorage=', localStorage);
  }

  // Generate key to store table column prefs, username and table name
  private generateKey(): string {
    // TODO Should maybe include username in key,
    // But, no easy way to get username. LoginService can't be injected into base component
    // Must change all extending classes and add there.
    return ('colPrefs_' + this.tableName);
  }
}

/**
 * Filter data by range of Date
 * @param rangeDates array of start date and end date
 * @param dataToFilter array of data to filter
 * @param fieldNameToFilter filter by
 */
export function filterDate(rangeDates: Array<any> | undefined, dataToFilter: Array<any>, fieldNameToFilter: string) {
  if (!rangeDates || !dataToFilter) {
    return dataToFilter;
  }
  const startDate = rangeDates[0];
  const endDate = rangeDates[1];
  return dataToFilter.filter(
    item =>
      (new Date(item[fieldNameToFilter]) > startDate && new Date(item[fieldNameToFilter]) < endDate) ||
      (new Date(item[fieldNameToFilter]).getUTCDate() === startDate.getDate() &&
        new Date(item[fieldNameToFilter]).getUTCMonth() === startDate.getMonth() &&
        new Date(item[fieldNameToFilter]).getUTCFullYear() === startDate.getFullYear()) ||
      (endDate &&
        (new Date(item[fieldNameToFilter]).getUTCDate() === endDate.getDate() &&
          new Date(item[fieldNameToFilter]).getUTCMonth() === endDate.getMonth() &&
          new Date(item[fieldNameToFilter]).getUTCFullYear() === endDate.getFullYear()))
  );
}


