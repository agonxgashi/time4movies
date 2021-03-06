import { AppUser } from './../models/Administration/appUser';
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/toPromise';
import * as JWT from 'jwt-decode';
import { Http } from "@angular/http";

@Injectable()
export class LogInSrv {
    private name : string = "jwt";
    constructor(private http: Http) {
    }

    private decodeJwt(): string {
        var decoded = JWT(this.getCookieValue());
        return JSON.stringify(decoded);
    
    }

    public retrieveUser():AppUser | undefined {
        try {
            let token: any = JSON.parse(this.decodeJwt());
            let u: AppUser = new AppUser();
            u.id           = token.acr;
            u.username     = token.unique_name;
            u.firstName    = token.given_name;
            u.lastName     = token.family_name;
            u.email = token.email;
            u.createDate = token.auth_time;
            return u;
        } catch (e) {
            return undefined;
        }
    }

    public setCookieValue(val: string) {
        localStorage.setItem(this.name, val);

        //document.cookie =
        //    this.name + "=" + val.replace('"', '').replace('"', '')
        //    + ";path=/";
    }

    public clearJwtCookie() {
        localStorage.removeItem(this.name);
        //document.cookie = this.name + '=; Max-Age=-0;';  
    }

    public getCookieValue(): any{
        return localStorage.getItem(this.name);

    //    var nameEQ = this.name + "=";
    //    var ca = document.cookie.split(';');
    //    for(var i=0;i < ca.length;i++) {
    //        var c = ca[i];
    //        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    //        return c.indexOf(nameEQ) == 0 ? c.substring(nameEQ.length,c.length) : "";
    //    }
    //return "";
    }

}