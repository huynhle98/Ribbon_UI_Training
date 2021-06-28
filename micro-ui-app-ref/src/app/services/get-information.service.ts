import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetInformationService {
  constructor() { }

  getInformation(): Observable<HttpResponse<Object>> {
    const version = {
      version: '',
      project: 'EMS',
      banner: ''
    };
    return of(new HttpResponse({ status: 200, body: version }));
  }

  parseProject(res: HttpResponse<any>): string {
    return res.body.project;
  }

  parseVersion(res: HttpResponse<any>): string {
    return res.body.version;
  }

  parseBanner(res: HttpResponse<any>): string {
    return res.body.banner;
  }

}
