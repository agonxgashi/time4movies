import { AppUser } from './../models/Administration/appUser';


import { Injectable } from '@angular/core'
import { Http } from "@angular/http"
import 'rxjs/add/operator/toPromise';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import * as JWT from 'jwt-decode';

@Injectable()
export class LogInSrv {
    private name : string = "jwt";
    constructor(private _http: Http, private router?: Router) {
    }

    private retrieve():string { 
        return "";
    
    }


    private  async getValidateUser(username: string, password: string){   

    }

    public  retrieveUser(): AppUser {  
        return new AppUser();
    }

    public setCookieValue(val: string){
        document.cookie = this.name + "=" + val;
    }

    public getCookieValue(): string{
        var nameEQ = this.name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            return c.indexOf(nameEQ) == 0 ? c.substring(nameEQ.length,c.length) : "";
        }
    return "";
    }

}