import { Http, RequestOptions, Headers } from '@angular/http';
import { AppUser } from './../../models/Administration/appUser';
import { Quote } from './../../models/Movie/Quote'
import { Component } from '@angular/core';
import { LogInSrv } from "../../services/logInService";
import { Router } from "@angular/router";
import { MovieModel } from './../../models/Movie/MovieModel';


@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    userToEdit: AppUser;
    isFullyLoaded:boolean = false;
    showLogIn: boolean = true;
    showHome: boolean = true;
    movie: MovieModel[];
    query: string = "?name=";
    name: string;


    constructor(private router: Router, private http: Http, private ls: LogInSrv) {
        this.userToEdit = new AppUser();
        this.showHome = this.ls.retrieveUser() ? true : false;
        this.isFullyLoaded = true;
    }

    login() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("/api/AppUser/LogInUser", JSON.stringify(this.userToEdit), options)
            .subscribe(
                (res) => {
                    this.ls.setCookieValue(res.text());
                    if (this.ls.retrieveUser()) {
                        this.showHome = !this.showHome;
                        location.reload();
                    } else {
                        alert("Username or password is wrong!");
                    }
                },
                (err) => {}
            );
    }

    logOut() {
        this.ls.clearJwtCookie();
        this.showHome = !this.showHome;
        location.reload();
    }

    signUp() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("/api/AppUser/CreateUser", JSON.stringify(this.userToEdit), options)
            .subscribe(
            (res) => { },
                (err) => {}
            );
    }

    blurContSwitch() {
        this.userToEdit = new AppUser();
        this.showLogIn = !this.showLogIn;
    }

    clearObject() {
        this.userToEdit = new AppUser();
    }
}
