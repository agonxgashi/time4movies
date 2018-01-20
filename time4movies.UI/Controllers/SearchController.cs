using Microsoft.AspNetCore.Mvc;
using time4movies.Models.Movies;
using time4movies.Services.Logic.Interfaces;

namespace time4movies.UI.Controllers
{
    [Produces("application/json")]
    [Route("api/Search")]
    public class SearchController : Controller
    {
        private IApiMoviesService _api;

        public SearchController(IApiMoviesService api)
        {
            _api = api;
        }

        [HttpGet("[action]")]
        public MoviesListModel ByName(string name)
        {
            return _api.GetMovieByName(name, 1);
        }

        [HttpGet("[action]")]
        
        public MovieModel ById(string id, int userId = -1)
        {
            return _api.GetMovieById(id, userId);
        }

        [HttpGet("[action]")]
        public MoviesListModel Trending()
        {
            return _api.GetTrendings();
        }
    }
}