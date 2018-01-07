using System;
using System.Collections.Generic;
using System.Text;

namespace time4movies.Models.API
{
    public class APIQueries
    {
        public static string SearchByMovieId_Query(string movieId)
        {
            return $"https://api.themoviedb.org/3/movie/{movieId}?api_key={ApiHelper.ApiToken}";
        }

        public static string SearchByName_Query(string movieName)
        {
            return $"http://api.themoviedb.org/3/search/movie?api_key={ApiHelper.ApiToken}&query={movieName}";
        }

        public static string DiscoverByPopularity_Query()
        {
            return $"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key={ApiHelper.ApiToken}";
        }


        public static string ImageFullPath_Query(string posterPath, PosterSize posterSize)
        {
            return !String.IsNullOrEmpty(posterPath) ?
                $"http://image.tmdb.org/t/p/{posterSize.ToString()}{posterPath}" :
                ApiHelper.PathBackdrop;
        }

    }

    //Possible options for Movie Poster path size
    //Requiring any other size than these will result on error response! 
    //That's a bad thing!
    //Do you want that? Ofc no. So don't touch this.
    public enum PosterSize 
    {
        w92,
        w154,
        w185,
        w342,
        w500,
        w780,
        original
    };
}
