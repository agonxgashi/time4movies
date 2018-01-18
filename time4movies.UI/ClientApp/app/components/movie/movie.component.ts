import { Http, RequestOptions, Headers } from '@angular/http';
import { JsonPipe } from '@angular/common';
import { AppUser } from './../../models/Administration/appUser';
import { Quote } from './../../models/Movie/Quote'; //A po don me hi te models? modelsi i MovieModelit mvyn
import { Component, OnInit } from '@angular/core';
import { LogInSrv } from "../../services/logInService";
import { Router, ActivatedRoute} from "@angular/router";
import { MovieModel } from './../../models/Movie/MovieModel';
import {
    Directive, forwardRef,
    Attribute, OnChanges, SimpleChanges, Input, ViewChild
} from '@angular/core';
import {
    NG_VALIDATORS, Validator,
    Validators, AbstractControl, ValidatorFn
} from '@angular/forms';





@Component({
    selector: 'movie',
    templateUrl: './movie.component.html',
    styles: [require('./movie.component.css')]
})
export class MovieComponent implements OnInit {
    private movId: number;
    quote: Quote;
    movie: MovieModel;
    user: AppUser;
    constructor(private route: ActivatedRoute, private router: Router, private http: Http, private ls: LogInSrv) { }
      //Tash qitu e bon at requestin te /api/SearchById
            //Edhe ja merr infot e filmit
            //Id e filmit osht te this.movId
            //over
    ngOnInit(): void {
        this.getRandomQuote();
        this.route.params.subscribe(params => {
            this.movId = params['id'];

            this.http.get("/api/Search/ById?id=" + this.movId)
                .subscribe(
                (res) => { this.movie = res.json(); console.log(res.json()) },
                (err) => { }

          )
        });
    }
    getRandomQuote() {
        this.http.get("/api/Quote/RandomQuote")
            .subscribe(
            (res) => { this.quote = res.json() },
            (err) => { }
            )

    }

    watched(movie:MovieModel) {
        this.http.get("api/Logic/InsertWatched", JSON.stringify(movie))
            .subscribe(
            (res) => { this.movie = res.json() },
            (err) => { }
            )
    }

    goToTrending() {
        this.router.navigate(['/home']);
    }

    //getMovieDetails() {
    //    this.http.get("/api/Search/ById?id=" + this.movId)
    //        .subscribe(
    //        (res) => { this.movie = res.json(); console.log(res.json()) },
    //        (err) => { }

    //    )
    //}
}