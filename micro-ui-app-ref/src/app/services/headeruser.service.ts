import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Headeruser, RbnMessageService } from 'rbn-common-lib';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HOST, VERSION } from '../api/constant';
import { RestService } from 'rbn-common-lib';
// HttpClient used only for reading local text files, should never be used for REST calls
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
const { version: appVersion } = require('../../../package.json');
const { version: libVersion } = require('../../../node_modules/rbn-common-lib/package.json');

@Injectable({
  providedIn: 'root',
})
export class HeaderuserService {
  private logoutUrl = `${HOST}/logout`;
  private username = 'sysadmin';
  private headeruser: Headeruser;
  private headeruserOb: Observable<Headeruser> = new Observable<Headeruser>();
  private uiBuildNum = '';
  private uiGitHash = '';

  constructor(private http: HttpClient, private restService: RestService,
    private route: Router, private rbnMessageService: RbnMessageService) {
    this.headeruser = this.initHeaderuser();

    
  }

  public getUserActions(): Observable<Headeruser> {
    // this.headeruserOb = this.mergeOb();
    return this.headeruserOb;
  }

  mergeOb(): Observable<Headeruser> {
    return this.getLoginUser().pipe(switchMap(() => this.getVersioninfo()));
  }

  getVersioninfo(): Observable<Headeruser> {
    const versionUrl = `${HOST}/${VERSION}/gui/releases/softwarerelease`;
    return this.restService.get(versionUrl).pipe(
      map((versionInfoResponse: any) => {
        if (versionInfoResponse && versionInfoResponse.body) {
          const versionInfo = versionInfoResponse.body;
          const infoContentParas = [] as string[];
          if (versionInfo['buildVersion']) {
            infoContentParas.push('Version: ' + versionInfo['buildVersion']);
          }
          if (versionInfo['buildTime']) {
            infoContentParas.push('Built: ' + versionInfo['buildTime']);
          }
          if (versionInfo['commitId']) {
            infoContentParas.push('Source Code Change Id: ' + versionInfo['commitId']);
          }
          if (versionInfo['sourceIp']) {
            infoContentParas.push('Running at IP: ' + versionInfo['sourceIp']);
          }
          if (versionInfo['vnfmRestUrl']) {
            infoContentParas.push('RESTful API IPv4:' + versionInfo['vnfmRestUrl']);
          }
          if (versionInfo['vnfmRestUrlIpv6']) {
            infoContentParas.push('RESTful API IPv6:' + versionInfo['vnfmRestUrlIpv6']);
          }
          if (versionInfo['buildNumber']) {
            infoContentParas.push('Build Number:' + '  ' + + versionInfo['buildNumber']);
          }

          infoContentParas.push('UI Common Lib Version: ' + libVersion);
          infoContentParas.push('UI Version: ' + appVersion);
          infoContentParas.push('UI Build Number: ' + this.uiBuildNum);
          infoContentParas.push('UI Git Hash: ' + this.uiGitHash);
          this.headeruser.infoContent = infoContentParas;
        }
        return this.headeruser;
      })
    );
  }

  getLoginUser(): Observable<Headeruser> {
    const userUrl = `${HOST}/${VERSION}/gui/vim/config/users/logged`;
    return this.restService.get(userUrl).pipe(
      map((user: any) => {
        if (user && user.body && user.body['username']) {
          this.username = user.body['username'];
          this.headeruser.username = this.username;
          if (this.headeruser.items && this.headeruser.items.length >= 1) {
            this.headeruser.items[0].label = this.headeruser.username;
          }
          this.headeruserOb = of(this.headeruser);
        }
        return this.headeruser;
      })
    );
  }

  private initHeaderuser(): Headeruser {
    const infoHeader = 'Ribbon EMS';
    const infoContent = [
      'The VNFM Version: 2018.3.0.Enderby.S30.Interim.4',
      'This version was built at: 09.11.2018@10:50:27 EST',
    ];
    const items = [
      {
        label: 'sysadmin',
        icon: 'pi pi-pw pi-user',
        items: [
          {
            label: 'About',
            icon: 'pi pi-pw',
          },
          // {
          //   label: 'Help',
          //   icon: 'pi pi-pw',
          //   command: () => {
          //     alert('TBD');
          //   }
          // },
          {
            label: 'Log out',
            icon: 'pi pi-pw',
          },
        ],
      },
    ];
    const headeruser = new Headeruser(items, this.username, this.logoutUrl, infoHeader, infoContent);
    return headeruser;
  }
  public logout(): void {
    console.log('service impl logout!!!=', this.logoutUrl);
    localStorage.clear();
    const body = new HttpParams();
    this.restService.post(this.logoutUrl, body).subscribe(
      res => {
        console.log(res);
        this.route.navigate(['login']);
        this.rbnMessageService.clear();
      },
      () => {
        this.route.navigate(['login']);
        this.rbnMessageService.clear();
        console.log('Logout error occured');
      }
    );
  }
}
