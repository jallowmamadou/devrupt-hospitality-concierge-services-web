import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private tokenService: HttpXsrfTokenExtractor) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = {};

        const token = this.tokenService.getToken();

        if (token !== null && !req.headers.has('X-XSRF-TOKEN')) {
            headers['X-XSRF-TOKEN'] = token;
        }

        if (window.localStorage.getItem('user_token')) {
            // headers.Authorization = 'Bearer ' + window.localStorage.getItem('user_token');
        }

        const changeRequest = req.clone({
            setHeaders: headers,
            withCredentials: true
        });

        return next.handle(changeRequest);
    }
}
