import { Http, RequestOptions, Headers } from '@angular/http';
import { JsonPipe } from '@angular/common';
import { AppUser } from './../../models/Administration/appUser';
import { Quote } from './../../models/Movie/Quote'
import { Component, OnInit } from '@angular/core';
import { LogInSrv } from "../../services/logInService";
import { Router } from "@angular/router";
import { MovieModel } from './../../models/Movie/MovieModel';
import { Directive, forwardRef,
    Attribute, OnChanges, SimpleChanges, Input, ViewChild
    } from '@angular/core';
import {
    NG_VALIDATORS, Validator,
    Validators, AbstractControl, ValidatorFn
    } from '@angular/forms';





@Component( {
    selector: 'landingpage',
    templateUrl: './landingpage.component.html',
    styles: [require('./landing.component.css')]
})
export class LandingPageComponent implements OnInit{
    userToEdit: AppUser;
    quote: Quote;
    showLogIn: boolean = true;
    movie: MovieModel[];
    query : string = "?name="
    name: string;

    constructor(private router: Router, private http: Http, private ls: LogInSrv) {
        this.userToEdit = new AppUser();
        this.showLogIn = true;
        

    }

    ngOnInit(){
        this.quote = new Quote();
        this.getRandomQuote();
        this.getTrendinMovies();
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
                    this.router.navigate(['/home']);
                }
                console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
            },
            (err) => { }
        )
        this.router.navigate(['/home']);
    
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
    searchMovies() {
        this.http.get("/api/Search/ByName" + this.query + this.name)
            .subscribe(
            (res) => { this.movie = res.json(); console.log(res.json()) },
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

    getTrendinMovies() {
        this.http.get("/api/Search/Trending")
            .subscribe(
            (res) => { this.movie = res.json(); console.log(res.json()); console.log(this.movie) },
            (err) => { }

            )

    }
    //gotoMovie() {
    //    this.http.get("/api/Search/ById" + this.query + this.id)
    //        .subscribe(
    //        (res) => { this.movie = res.json(); console.log(res.json()) },
    //        (err) => { }

    //        )
       
    //}
    blurContSwitch() {
        this.userToEdit = new AppUser();
        
        this.showLogIn  = !this.showLogIn;
    }

    clearObject() {
        this.userToEdit = new AppUser();
    }




}