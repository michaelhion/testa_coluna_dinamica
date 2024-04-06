import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Transacao } from '../models/desempenho';
import { PspList } from '../models/pspList';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Fudeu cuzão.'));
  }
  url:string= 'http://localhost:3000';
  constructor(
    private http: HttpClient
  ) { }

  getAll(pspCodes: string[]):Observable<Transacao[]>{
    let params = new HttpParams();
    pspCodes.forEach(code => {
      params = params.append('info_desempenho.descricao', code);
    });
    return this.http.get<Transacao[]>(`${this.url}/data`, { params: params }).pipe(catchError(this.handleError));
  }

  getPsp() : Observable<PspList[]>{
    return this.http.get<PspList[]>(`${this.url}/psp`).pipe(catchError(this.handleError));
  }
}
