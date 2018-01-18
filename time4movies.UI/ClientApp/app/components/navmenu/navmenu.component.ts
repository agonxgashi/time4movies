import { Http, RequestOptions, Headers } from '@angular/http';
import { JsonPipe } from '@angular/common';
import { AppUser } from './../../models/Administration/appUser';
import { Quote } from './../../models/Movie/Quote'
import { Component, OnInit } from '@angular/core';
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
    quote: Quote;
    showLogIn: boolean = true;
    showHome: boolean = true;
    movie: MovieModel[];
    query: string = "?name="
    name: string;


    constructor(private router: Router, private http: Http, private ls: LogInSrv) {
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
                    this.ls.setCookieValue(res.text())
                    {

                        //this.router.navigate(['/home']);
                    }
                    console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                },
                (err) => { }
            )
        //this.router.navigate(['/home']);
        this.showHome = !this.showHome;

    }

    logOut() {
        this.showHome = !this.showHome;
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

    goHome() {
        this.router.navigate(['/home']);

    }

    ngOnInit(): void {
        this.getRandomQuote();
    }


    blurContSwitch() {
        this.userToEdit = new AppUser();
        this.showLogIn = !this.showLogIn;
    }

    getRandomQuote() {
        this.http.get("/api/Quote/RandomQuote")
            .subscribe(
                (res) => { this.quote = res.json() },
                (err) => { }
            )

    }

}
