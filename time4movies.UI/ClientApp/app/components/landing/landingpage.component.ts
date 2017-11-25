import { Http, RequestOptions, Headers } from '@angular/http';
import { JsonPipe } from '@angular/common';
import { AppUser } from './../../models/Administration/appUser';
import { Quote } from './../../models/Movie/Quote'
import { Component, OnInit } from '@angular/core';
import { LogInSrv } from "../../services/logInService";
import { FormGroup, FormControl, Validators } from '@angular/forms';





@Component({
    selector: 'landingpage',
    templateUrl: './landingpage.component.html',
    styles: [require('./landing.component.css')]
})
export class LandingPageComponent implements OnInit{
   
    userToEdit: AppUser;
    quote: Quote;
    showLogIn : boolean = true;

    constructor(private http: Http, private ls: LogInSrv) {
        this.userToEdit = new AppUser();
        this.showLogIn = true;

    }

    ngOnInit(){
        this.quote = new Quote();
        this.getRandomQuote();
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

    getRandomQuote() {
        this.http.get("/api/Quote/RandomQuote")
            .subscribe(
            (res) => { this.quote = res.json(); console.log(res.json()); console.log(this.quote) },
                (err) => { }
            )
    }


    blurContSwitch() {
        this.userToEdit = new AppUser();
        
        this.showLogIn  = !this.showLogIn;
    }

    clearObject() {
        this.userToEdit = new AppUser();
    }




}