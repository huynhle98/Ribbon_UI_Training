import { Injectable } from '@angular/core';
import { Headeralert } from 'rbn-common-lib';
import { RestService } from 'rbn-common-lib';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HOST, VERSION } from '../api/constant';

@Injectable({
  providedIn: 'root'
})
export class HeaderalertService {

  headeralert: Headeralert = { info: 0, debug: 0, error: 0 };
  private headeralertOb = of(this.headeralert);

  constructor(private restService: RestService) {
    this.callAlertservice();
  }

  public getAlertCounts(): Observable<Headeralert> {
    return this.headeralertOb;
  }

  private callAlertservice(): void {
    const alertUrl = `${HOST}/${VERSION}/gui/events/system`;
    this.restService.get(alertUrl).subscribe(
      (alertOrigs: any) => {
        if (alertOrigs.body && alertOrigs.body.length > 0) {
          let info = 0;
          let debug = 0;
          let error = 0;
          for (const alertOrig of alertOrigs.body) {
            if (alertOrig['severity']) {
              const severity = alertOrig['severity'];
              if (severity === 'ERROR') {
                error = error + 1;
              } else if (severity === 'DEBUG' || severity === 'WARNING') {
                debug = debug + 1;
              } else if (severity === 'INFO') {
                info = info + 1;
              }
            }
          }
          this.headeralert = { info: info, debug: debug, error: error };
          this.headeralertOb = of(this.headeralert);
        }
      },
      (err) => {
        console.log('service getUserActions err = ', err);
      });
  }
}
