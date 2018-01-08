import { Component } from '@angular/core';
import { MovieModel } from './../../models/Movie/MovieModel';
import { Http, RequestOptions, Headers } from '@angular/http';
import { JsonPipe } from '@angular/common';
import {
    Directive, forwardRef,
    Attribute, OnChanges, SimpleChanges, Input
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
export class HomeComponent {
    movie: MovieModel[];
    queryUrl: string = '?name=';
    name: string;
    
    constructor(private http: Http) {

    }
    
    searchMovies() {
        this.http.get("/api/Search/ByName" + this.queryUrl + this.name )    
            .subscribe(
            (res) => { this.movie = res.json(); console.log(res.json()) },
            (err) => { }
            
        )
        
    }
}
