import { Injectable, Optional, Inject } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { LogInSrv } from './../logInService'
//import { environment } from "../environments/environment";

@Injectable()
export class InterceptedHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private loginSrv: LogInSrv) {
    // constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _logInSrv?: LogInSrv) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
       // return super.request(url, options);
        return super.request(url, options).catch((error: Response) => {
            console.error('Error Code: ' + error.status);
            if ((error.status === 401 || error.status === 403 || error.status === 302)) {
                console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
                window.location.href = '/landing';
            }
            return Observable.throw(error);
        });
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        console.log('GET');
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private updateUrl(req: string) {
        return req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }

        if (options.headers == null || options.headers == undefined) {
            options.headers = new Headers();
        }
        
        if (options.headers != undefined) {
            // let str = this._logInSrv.getCookieValue().toString();
            let str = this.loginSrv.getCookieValue();
            options.headers.append('Authorization', "Bearer " + str);    
        }

                
        return options;        
    }
}