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
    
    constructor(private http: Http, private router: Router) {
        
    }


    ngOnInit() {
        this.getTrendinMovies();
        //this.getRandomQuote();
    }
    searchMovies() {
        this.http.get("/api/Search/ByName" + this.queryUrl + this.name )    
            .subscribe(
            (res) => { this.movie = res.json(); console.log(res.json()) },
            (err) => { }
            
        )
        
    }
    //getRandomQuote() {
    //    this.http.get("/api/Quote/RandomQuote")
    //        .subscribe(
    //        (res) => { this.quote = res.json(); console.log(res.json()); console.log(this.quote) },
    //        (err) => { }
    //        )

    //}

    getTrendinMovies() {
        this.http.get("/api/Search/Trending")
            .subscribe(
            (res) => { this.movie = res.json(); console.log(res.json()); console.log(this.movie) },
            (err) => { }

            )

    }
    gotoMovie(movId: number) {
        console.log(movId)
        this.router.navigate(['/movie/' + movId]);
    }
}
