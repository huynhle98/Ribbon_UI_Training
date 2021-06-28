import { Injectable } from '@angular/core';
import { RestService } from 'rbn-common-lib';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HOST, VERSION } from '../api/constant';

@Injectable({
  providedIn: 'root'
})
export class GlobalstatusService {

  private vnfmState = '';
  private vnfmStateOb = of(this.vnfmState);

  constructor(private restService: RestService) {
    this.callVnfmState();
  }

  public getVnfmstatus(): Observable<string> {
    this.callVnfmState();
    return this.vnfmStateOb;
  }

  private callVnfmState(): void {
    const vnfmStateUrl = `${HOST}/${VERSION}/gui/vim/config/vnfmstatus`;
    this.restService.get(vnfmStateUrl).subscribe(
      (resp: any) => {
        // console.log('GlobalstatusService resp=', resp);
        if (resp.body && resp.body.vnfmState) {
          if (resp.body.vnfmState.length > 0) {
            this.vnfmState = resp.body.vnfmState;
            this.vnfmStateOb = of(this.vnfmState);
            // console.log('set this.vnfmStateOb =', this.vnfmStateOb);
          }
        }
      },
      (err) => {
        console.log('service getUserActions err = ', err);
      });
  }
}
