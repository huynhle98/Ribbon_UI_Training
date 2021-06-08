import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Skin } from "../../model/skin";
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class SkinService {

  private skinsUrl = '/api/skins';
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getSkins(): Observable<Skin[]> {
    return this.http.get<Skin[]>(this.skinsUrl)
      .pipe(
        tap(_ => this.log('fetched skins')),
        catchError(this.handleError<Skin[]>('getSkins', []))
      );
  }
  deleteSkin(id: number, callback): Observable<Skin> {
    const url = `${this.skinsUrl}/${id}`;

    return this.http.delete<Skin>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted skin id=${id}`),callback()),
      catchError(this.handleError<Skin>('deleteSkin'))
    );
  }
  searchSkins(term: string, callback): Observable<Skin[]> {
    if (!term.trim()) {
      return of([], callback(false));
    }
    return this.http.get<Skin[]>(`${this.skinsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        (this.log(`found skins matching "${term}"`), callback(x)) :
        (this.log(`no skins matching "${term}"`), callback(x))),
      catchError(this.handleError<Skin[]>('searchSkins', [])),
    );
  }
}
