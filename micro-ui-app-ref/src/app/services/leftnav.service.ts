import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
// import { FmService } from 'fm';

@Injectable({
  providedIn: 'root'
})
export class LeftnavService {

  private menuItems: MenuItem[] = [];

  constructor() {
  }

  public getLeftnavItems(): Observable<MenuItem[]> {
    this.initMenuItems();
    return of(this.menuItems);
  }

  private initMenuItems(): void {
    this.menuItems = [
      {
        label: 'Dashboard',
        id: 'dashboard',
        icon: 'pi pi-pw',
        routerLink: ['/dashboard'],
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Node Management',
        id: 'node',
        icon: 'pi pi-pw',
        routerLink: ['/node'],
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Cluster Management',
        id: 'cluster',
        icon: 'pi pi-pw',
        routerLink: ['/cluster'],
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Fault Management',
        id: 'fasul',
        icon: 'pi pi-pw',
        routerLink: ['/fm'],
        routerLinkActiveOptions: { exact: true }
      }
    ];

    // Now need to get menu items from FM shared library
    // const fmItems = this.fmService.getLeftNavItems();
    // this.menuItems = this.menuItems.concat(fmItems);
  }
}
