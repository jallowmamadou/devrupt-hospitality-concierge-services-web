import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiServiceService {
    constructor(public http: HttpClient) {
    }

    public get(endpoint) {
        return this.request(endpoint, 'GET');
    }

    public post(endpoint: string, body?: any, headers: any = {'Content-Type': 'application/json'}) {
        return this.request(endpoint, 'POST', body, headers);
    }


    private request(endpoint: string, method: string, body?: any, extraHeaders = {}) {
        const httpOptions = {
            headers: new HttpHeaders(
                Object.assign(
                    {
                        Accept: 'application/json',
                        charset: 'utf-8',
                    },
                    extraHeaders
                )
            ),
            body
        };

        return this.http.request(method, environment.apiBaseUrl.concat(endpoint), httpOptions);
    }
}
