import { Http } from '@angular/http';
import { AppUser } from './../../models/Administration/appUser';
import { Quote } from './../../models/Movie/Quote'; //A po don me hi te models? modelsi i MovieModelit mvyn
import { Component, OnInit } from '@angular/core';
import { LogInSrv } from "../../services/logInService";
import { Router, ActivatedRoute} from "@angular/router";
import { MovieModel } from './../../models/Movie/MovieModel';
import { Watched } from './../../models/Logic/Watched';

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
    ngOnInit(): void {
        this.getRandomQuote();
        this.route.params.subscribe(params => {
            this.movId = params['id'];

            this.http.get("/api/Search/ById?id=" + this.movId)
                .subscribe(
                    (res) => { this.movie = res.json(); },
                    (err) => {}
                );
        });
    }
    getRandomQuote() {
        this.http.get("/api/Quote/RandomQuote")
            .subscribe(
                (res) => { this.quote = res.json() },
                (err) => {}
            );

    }

    watched(w: Watched) {
        this.http.get("api/Logic/InsertWatched", JSON.stringify(w.movieId))
            .subscribe(
                (res) => { this.movie = res.json() },
                (err) => {}
            );
    }

    goToTrending() {
        this.router.navigate(['/home']);
    }

}