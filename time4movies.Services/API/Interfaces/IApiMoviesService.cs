using System;
using System.Collections.Generic;
using System.Text;
using time4movies.Models.Movies;

namespace time4movies.Services.Logic.Interfaces
{
    interface IApiMoviesService
    {
        MovieModel GetMovieById(string movieId);
        MoviesListModel GetMoviehByName(string name, int currentUserId);
    }
}
