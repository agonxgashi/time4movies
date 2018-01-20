import { Component } from '@angular/core';
import { MovieModel } from './../../models/Movie/MovieModel';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Quote } from './../../models/Movie/Quote'
import { JsonPipe } from '@angular/common';
import { Router } from "@angular/router";
import {
    Directive, forwardRef,
    Attribute, OnChanges, SimpleChanges, Input, OnInit
} from '@angular/core';
import {
    NG_VALIDATORS, Validator,
    Validators, AbstractControl, ValidatorFn
} from '@angular/forms';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styles: [require('./home.css')]
})
export class HomeComponent implements OnInit {
    movie: MovieModel[];
    queryUrl: string = '?name=';
    name: string;
    quote: Quote;
    isSearching: boolean;
    
    constructor(private http: Http, private router: Router) {
        this.isSearching = true;
    }


    ngOnInit() {
        this.getTrendinMovies();
    }
    searchMovies() {
        this.isSearching = true;
        this.http.get("/api/Search/ByName" + this.queryUrl + this.name )    
            .subscribe(
            (res) => {
                this.movie = res.json();
                this.isSearching = false;
            },
            (err) => { }
            
        )
        if (this.name == "") {
            this.getTrendinMovies();
        }
    }

    getTrendinMovies() {
        this.isSearching = true;
        this.http.get("/api/Search/Trending")
            .subscribe(
            (res) => {
                this.movie = res.json();
                this.isSearching = false;
            },
            (err) => { }

            )

    }
    gotoMovie(movId: number) {
        console.log(movId)
        this.router.navigate(['/movie/' + movId]);
    }
}
