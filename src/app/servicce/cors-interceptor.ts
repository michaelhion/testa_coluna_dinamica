import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Adicione os cabeçalhos CORS à solicitação
    const corsReq = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*', // Altere para a origem correta, se necessário
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

    return next.handle(corsReq);
  }
}