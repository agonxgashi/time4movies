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
import { MovieListModel } from '../../models/Movie/MovieListModel';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styles: [require('./home.css')]
})
export class HomeComponent implements OnInit {
    movie: MovieListModel;
    queryUrl: string = '?name=';
    name: string;
    quote: Quote;
    isSearching: boolean;
    showResult: boolean;

    constructor(private http: Http, private router: Router) {
        this.isSearching = true;
    }


    ngOnInit() {
        this.searchMovies();
    }
    searchMovies() {
        this.isSearching = true;

        var searchQuery = this.name ? "/api/Search/ByName" + this.queryUrl + this.name: "/api/Search/Trending";

        this.http.get(searchQuery)
            .subscribe(
            (res) => {
                this.movie = res.json();
                console.log(this.movie)
                this.isSearching = false;
                if (this.movie.total_results > 0) {
                    this.showResult = false;
                }
                else {
                    this.showResult = true;
                }
              
            },
            (err) => { }

            )

    }

    //getTrendinMovies() {
    //    this.isSearching = true;
    //    this.http.get("/api/Search/Trending")
    //        .subscribe(
    //        (res) => {
    //            this.movie = res.json();
    //            this.isSearching = false;
    //        },
    //        (err) => { }

    //        )

    //}
    gotoMovie(movId: number) {
        console.log(movId)
        this.router.navigate(['/movie/' + movId]);
    }
}
