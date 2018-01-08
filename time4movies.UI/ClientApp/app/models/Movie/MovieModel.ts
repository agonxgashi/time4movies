import { Genre } from "./Genre";
import { Production_Companies } from "./Production_Companies";
import { Production_Countries } from "./Production_Countries";
import { Spoken_Languages } from "./Spoken_Languages";
import { BaseMovieModel } from "./BaseMovieModel";

export class MovieModel extends BaseMovieModel {
    constructor(){
        super();

    }
    belongs_to_collection: object;
    budget: number;
    genres: Genre[];
    homepage: string;   
    production_companies: Production_Companies[];
    production_countries: Production_Countries[];
    revenue: number;
    runtime: number;
    spoken_languages: Spoken_Languages[];

}