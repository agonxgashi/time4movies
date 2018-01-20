using time4movies.Models.Logic;
using time4movies.Repository.Movies;
using time4movies.Services.Movies.Interfaces;

namespace time4movies.Services.Movies
{
    public class MoviesService : IMoviesService
    {
        private IMoviesRepo _movieRepo;

        public MoviesService(IMoviesRepo movieRepo)
        {
            _movieRepo = movieRepo;
        }

        public Watched GetMovie(string imdbMovieId, int movieId)
        {
            return _movieRepo.GetMovie(imdbMovieId, movieId);
        }
    }
}