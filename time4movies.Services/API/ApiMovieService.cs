using Newtonsoft.Json;
using System;
using System.Net.Http;
using time4movies.Models.API;
using time4movies.Models.Logic;
using time4movies.Models.Movies;
using time4movies.Repository.Error;
using time4movies.Services.Logic.Interfaces;
using time4movies.Services.Movies.Interfaces;

namespace time4movies.Services.Logic
{
    public class ApiMovieService : IApiMoviesService
    {
        private IMoviesService _movSrv;

        public ApiMovieService(IMoviesService movSrv)
        {
            _movSrv = movSrv;
        }

        public MovieModel GetMovieById(string movieId, int userId)
        {
            MovieModel momvie = new MovieModel();

            try
            {
                HttpClient httpClient = new HttpClient();
                string body = httpClient.GetStringAsync(APIQueries.SearchByMovieId_Query(movieId)).Result;
                momvie = JsonConvert.DeserializeObject<MovieModel>(body);

                Watched w = _movSrv.GetMovie(momvie.id.ToString(), userId);
                if (w != null)
                {
                    momvie.IsWatchedByUser = true;
                    momvie.DateWatched = w.DateCreated;
                }

            }
            catch (Exception ex)
            {
                AppErrorRepo.InsertError(ex);
            }

            return momvie;
        }

        public MoviesListModel GetMovieByName(string name, int currentUserId)
        {
            MoviesListModel list = new MoviesListModel();

            if (!String.IsNullOrEmpty(name))
            {
                try
                {
                    HttpClient httpClient = new HttpClient();
                    string body = httpClient.GetStringAsync(APIQueries.SearchByName_Query(name)).Result;
                    list = JsonConvert.DeserializeObject<MoviesListModel>(body);
                }
                catch (Exception ex)
                {
                    AppErrorRepo.InsertError(ex);
                }

                //List<TM_Movie> p = ProfileBLL.GetUserWatchedMovies(currentUserId);

                //foreach (TM_Movie wl in p) //Watched List
                //    foreach (var rl in s.Results) //ResultList
                //        if (wl.Id == rl.Id || wl.ImdbId == rl.Id.ToString())
                //            rl.UserDataAboutMovie.IsWatched = true;
            }
            return list;
        }

        public MoviesListModel GetTrendings()
        {
            MoviesListModel list = new MoviesListModel();

            try
            {
                HttpClient httpClient = new HttpClient();
                string body = httpClient.GetStringAsync(APIQueries.DiscoverByPopularity_Query()).Result;
                list = JsonConvert.DeserializeObject<MoviesListModel>(body);
            }
            catch (Exception ex)
            {
                AppErrorRepo.InsertError(ex);
            }

            //List<TM_Movie> p = ProfileBLL.GetUserWatchedMovies(currentUserId);

            //foreach (TM_Movie wl in p) //Watched List
            //    foreach (var rl in s.Results) //ResultList
            //        if (wl.Id == rl.Id || wl.ImdbId == rl.Id.ToString())
            //            rl.UserDataAboutMovie.IsWatched = true;
            return list;
        }
    }
}
