import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AlertService} from "@app/modules/alert/alert.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private alertService = inject(AlertService)


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true,
    })
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        if (error.status === 0 || error.status === 500)
          this.alertService.errorNotification('Hay problemas para conectarse al servidor.')
        else if (error.status !== 404)
          this.alertService.errorNotification(error.message, error.statusText)
        return throwError(() => error)
      })
    );
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
];
