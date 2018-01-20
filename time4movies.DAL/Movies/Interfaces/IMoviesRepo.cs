using time4movies.Models.Logic;

namespace time4movies.Repository.Movies
{
    public interface IMoviesRepo
    {
        Watched GetMovie(string imdbMovieId, int userId);
    }
}