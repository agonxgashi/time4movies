using System;
using System.Collections.Generic;
using System.Text;
using time4movies.Models.Movies;

namespace time4movies.Services.Logic.Interfaces
{
    public interface IApiMoviesService
    {
        MovieModel GetMovieById(string movieId, int userId);
        MoviesListModel GetTrendings();
        MoviesListModel GetMovieByName(string name, int currentUserId);
    }
}
