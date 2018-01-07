using System;
using System.Collections.Generic;
using System.Text;

namespace time4movies.Models.API
{
    public class APIQueries
    {
        public static string SearchByMovieId_Query(int movieId)
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
