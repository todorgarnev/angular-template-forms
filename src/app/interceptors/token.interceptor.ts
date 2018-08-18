import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const appKey = 'kid_HyRvl9H87';
const appSecret = '0fcaf6f580a54b4c98cca92fb2b19c0e';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('login') || request.url.endsWith(appKey)) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
          'Content-type': 'application/json'
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
          'Content-type': 'application/json'
        }
      });
    }

    return next.handle(request);
  }
}
