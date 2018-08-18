import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../authentication/services/auth.service';
import { Router } from '@angular/router';

const appKey = 'kid_HyRvl9H87';
const appSecret = '0fcaf6f580a54b4c98cca92fb2b19c0e';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
    private router: Router) { }

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

    return next.handle(request)
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && request.url.endsWith('login')) {
          this.successfulLogin(event.body);
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              this.router.navigate(['/login']);
              break;
            case 404:
              this.router.navigate(['/not-found']);
              break;
          }
        }

      }));
  }

  private successfulLogin(data) {
    this.authService.setAuthtoken(data['_kmd']['authtoken']);
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    this.router.navigate(['/home']);
  }
}
