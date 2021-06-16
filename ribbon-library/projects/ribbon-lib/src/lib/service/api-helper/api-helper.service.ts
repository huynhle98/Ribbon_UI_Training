import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: {},
    responseType: null
  };

  constructor(private http: HttpClient) { }

  sendRequest(method: string, url: string, data, callback) {
    if (data) {
      this.httpOptions.params = data;
    }
    this.httpOptions.responseType = 'json';
    // return this.http.request(method, url, this.httpOptions).toPromise().then(res => {
    //   res.json().data;
    // }).catch(this.handleError);
    return this.http.request(method, url, this.httpOptions)
      .toPromise()
      .then( response => { callback(response)})
      .catch(this.handleError);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
