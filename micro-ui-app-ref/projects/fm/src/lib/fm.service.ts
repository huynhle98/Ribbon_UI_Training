import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FmService {

  constructor() { }

  getLeftNavItems() {

    const menuItems: MenuItem[] = [
      {
        label: 'Fault Management',
        id: 'realtime',
        icon: 'pi pi-pw'


      }
    ];
    return menuItems;

  }
}
