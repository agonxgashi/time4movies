using time4movies.Models.Logic;

namespace time4movies.Services.Movies.Interfaces
{
    public interface IMoviesService
    {
        Watched GetMovie(string imdbMovieId, int movieId);
    }
}