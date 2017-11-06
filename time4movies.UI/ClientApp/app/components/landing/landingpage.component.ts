import { Http, RequestOptions, Headers } from '@angular/http';
import { JsonPipe } from '@angular/common';
import { AppUser } from './../../models/Administration/appUser';
import { Component } from '@angular/core';


@Component({
    selector: 'landingpage',
    templateUrl: './landingpage.component.html',
    styles: [require('./landing.component.css')]
})
export class LandingPageComponent{  
    userToEdit: AppUser;
    showLogIn : boolean = true;

    constructor(private http: Http) {
        this.userToEdit = new AppUser();
        this.showLogIn = true;
    }

    login() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("/api/AppUser/LogInUser", JSON.stringify(this.userToEdit), options)
            .subscribe(
            (res) => {
                console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                console.log(res.text())
                console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
            },
            (err) => { }
            )
    }

    signUp() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("/api/AppUser/CreateUser", JSON.stringify(this.userToEdit), options)
            .subscribe(
                (res) => { },
                (err) => { }
            )
    }

    blurContSwitch() {
        this.userToEdit = new AppUser();
        this.showLogIn  = !this.showLogIn;
    }
}