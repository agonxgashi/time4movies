import { XHRBackend, Http, RequestOptions } from "@angular/http";
// import InterceptedHttp = require("./HttpInterceptor");
import {InterceptedHttp } from "./HttpInterceptor"
import { Inject } from "@angular/core";
import { LogInSrv } from "../logInService";

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions, new LogInSrv(new Http(xhrBackend, requestOptions)));
}